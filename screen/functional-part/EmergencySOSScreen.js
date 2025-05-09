import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/EmergencySOSScreenStyles';

// Import services
import emergencyService from '../../services/emergencyService';
import locationService from '../../services/locationService';

const ASSEMBLY_API_KEY = '6582380b8a8e49cb81545a91e76c8960';
const HOTWORDS = ['sos', 'help', 'bachaao'];

const EmergencySOSScreen = () => {
  const navigation = useNavigation();
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [sosDuration, setSosDuration] = useState(0);
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');
  const recordingRef = useRef(null);

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  // Error state for API error handling
  const [error, setError] = useState(null);

  // Location data state
  const [locationData, setLocationData] = useState(null);

  // State for tracking emergency actions
  const [emergencyActions, setEmergencyActions] = useState({
    locationSent: false,
    policeCalled: false,
    ngoCalled: false,
    evidenceSaved: false,
    locationTracking: false
  });

  // Add cleanup effect
  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  async function startRecording() {
    try {
      setIsLoading(true);
      // Clean up any existing recording
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }
      if (recording) {
        await recording.stopAndUnloadAsync();
      }

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone permission for emergency recording');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setRecording(recording);
      console.log('Emergency recording started');
    } catch (err) {
      console.error('Failed to start emergency recording', err);
      Alert.alert('Error', 'Failed to start emergency recording');
    } finally {
      setIsLoading(false);
    }
  }

  async function stopRecording() {
    try {
      setIsLoading(true);
      console.log('Stopping emergency recording...');
      if (!recordingRef.current) return;

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      console.log('Emergency recording stopped and stored at', uri);

      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const audioBuffer = Buffer.from(base64Audio, 'base64');
      const uploadUrl = await uploadToAssembly(audioBuffer);

      if (uploadUrl) {
        const transcriptText = await transcribeWithAssembly(uploadUrl);
        setTranscript(transcriptText);
        console.log('Emergency transcript:', transcriptText);

        // Save the recording as evidence
        await saveEvidenceToBlockchain(uri, transcriptText);
      }
    } catch (err) {
      console.error('Error in stopRecording:', err);
      Alert.alert('Error', 'Failed to process emergency recording');
    } finally {
      setIsLoading(false);
      setRecording(null);
    }
  }

  async function uploadToAssembly(audioBuffer) {
    try {
      const response = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLY_API_KEY,
          'Transfer-Encoding': 'chunked',
        },
        body: audioBuffer,
      });

      const data = await response.json();
      return data.upload_url;
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error', 'Failed to upload emergency audio');
      return null;
    }
  }

  async function transcribeWithAssembly(audioUrl) {
    try {
      const response = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLY_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio_url: audioUrl }),
      });

      const data = await response.json();
      const transcriptId = data.id;

      let completed = false;
      let transcriptText = '';
      while (!completed) {
        await new Promise(res => setTimeout(res, 3000));
        const pollingRes = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: { authorization: ASSEMBLY_API_KEY },
          }
        );
        const pollingData = await pollingRes.json();
        if (pollingData.status === 'completed') {
          completed = true;
          transcriptText = pollingData.text;
        } else if (pollingData.status === 'error') {
          throw new Error(pollingData.error);
        }
      }

      return transcriptText;
    } catch (error) {
      console.error('Transcription failed:', error);
      Alert.alert('Error', 'Failed to transcribe emergency audio');
      return '';
    }
  }

  // Initiate emergency protocol when screen loads
  useEffect(() => {
    const initiateEmergency = async () => {
      try {
        setIsLoading(true);
        setIsAlertActive(true);

        // Request location permissions first if not already granted
        await locationService.requestPermissions();

        // Start emergency recording
        await startRecording();

        // Initiate SOS with emergency location tracking
        const response = await emergencyService.initiateSOS();
        console.log('Emergency initiated:', response);

        // Set emergency actions status
        setEmergencyActions(prev => ({
          ...prev,
          locationTracking: true
        }));
      } catch (err) {
        setError('Failed to initiate emergency protocol: ' + err.message);
        console.error('Failed to initiate emergency:', err);
        Alert.alert('Emergency Error', 'Failed to initiate emergency. ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initiateEmergency();

    // Clean up when component unmounts
    return () => {
      if (recording) {
        stopRecording();
      }
      // Only stop emergency if user navigates away without explicitly stopping
      if (isAlertActive) {
        emergencyService.stopEmergencyAlert().catch(err => {
          console.error('Error stopping emergency on unmount:', err);
        });
      }
    };
  }, []);

  // Set up location update listener
  useEffect(() => {
    // Set up listener for location updates
    const locationUpdateCallback = (data) => {
      setLocationData(data);
      console.log('Location updated:', data);
    };

    locationService.onLocationUpdate(locationUpdateCallback);

    // Get initial location immediately
    locationService.getCurrentLocation()
      .then(location => {
        setLocationData(location);
      })
      .catch(err => {
        console.error('Error getting initial location:', err);
      });

    return () => {
      // Clean up by setting the callback to null
      locationService.onLocationUpdate(null);
    };
  }, []);

  // Timer for SOS duration
  useEffect(() => {
    // Only start the timer if alert is active
    if (!isAlertActive) return;

    const timer = setInterval(() => {
      setSosDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isAlertActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Send location to guardians
  const sendLocationToGuardians = async () => {
    if (emergencyActions.locationSent) {
      Alert.alert('Already Sent', 'Location has already been sent to guardians');
      return;
    }

    try {
      setIsLoading(true);
      await emergencyService.sendLocationToGuardians();
      setEmergencyActions(prev => ({ ...prev, locationSent: true }));
      Alert.alert('Success', 'Location sent to guardians successfully');
    } catch (err) {
      setError('Failed to send location to guardians: ' + err.message);
      Alert.alert('Error', 'Failed to send location to guardians: ' + err.message);
      console.error('Error sending location to guardians:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Call police and NGO
  const callPoliceAndNGO = async () => {
    if (emergencyActions.policeCalled && emergencyActions.ngoCalled) {
      Alert.alert('Already Notified', 'Police and NGO have already been notified');
      return;
    }

    try {
      setIsLoading(true);
      await emergencyService.callPoliceAndNGO();
      setEmergencyActions(prev => ({ ...prev, policeCalled: true, ngoCalled: true }));
      Alert.alert('Success', 'Police and NGO have been notified');
    } catch (err) {
      setError('Failed to notify authorities: ' + err.message);
      Alert.alert('Error', 'Failed to notify authorities: ' + err.message);
      console.error('Error notifying authorities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save evidence to blockchain
  const saveEvidenceToBlockchain = async (audioUri, transcriptText) => {
    if (emergencyActions.evidenceSaved) {
      Alert.alert('Already Saved', 'Evidence has already been securely saved');
      return;
    }

    try {
      setIsLoading(true);
      await emergencyService.saveEvidenceToBlockchain({
        audioUri,
        transcript: transcriptText,
        timestamp: new Date().toISOString(),
        location: locationData
      });
      setEmergencyActions(prev => ({ ...prev, evidenceSaved: true }));
      Alert.alert('Success', 'Emergency evidence has been securely saved');
    } catch (err) {
      setError('Failed to save evidence: ' + err.message);
      Alert.alert('Error', 'Failed to save evidence: ' + err.message);
      console.error('Error saving evidence:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF3B30" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <SafeMitraLogo color="#FF3B30" size={30} />
          <Text style={styles.logoText}>SafeMitra</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Loading Indicator */}
          {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />}

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Emergency SOS Activated!</Text>
            <Text style={styles.subtitle}>
              Your emergency SOS has been activated. Help is on the way.
            </Text>
          </View>

          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <Ionicons name="time" size={24} color="#FF3B30" />
            <Text style={styles.timerText}>SOS Active: {formatTime(sosDuration)}</Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map" size={40} color="#CCCCCC" />
              <Text style={styles.mapPlaceholderText}>Live Location Map</Text>
              {locationData ? (
                <Text style={styles.mapPlaceholderSubtext}>
                  Latitude: {locationData.latitude.toFixed(6)},
                  Longitude: {locationData.longitude.toFixed(6)}
                  {locationData.accuracy && ` (±${locationData.accuracy.toFixed(1)}m)`}
                </Text>
              ) : (
                <Text style={styles.mapPlaceholderSubtext}>
                  Waiting for location data...
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                emergencyActions.locationSent && styles.actionButtonCompleted
              ]}
              onPress={sendLocationToGuardians}
              disabled={isLoading || emergencyActions.locationSent}
            >
              <Ionicons
                name="location"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {emergencyActions.locationSent ? 'Location Sent ✓' : 'Send Live Location to Guardians'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.emergencyButton,
                (emergencyActions.policeCalled && emergencyActions.ngoCalled) && styles.actionButtonCompleted
              ]}
              onPress={callPoliceAndNGO}
              disabled={isLoading || (emergencyActions.policeCalled && emergencyActions.ngoCalled)}
            >
              <Ionicons
                name="call"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {(emergencyActions.policeCalled && emergencyActions.ngoCalled) ?
                  'Authorities Notified ✓' : 'Call Police & NGO'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.blockchainButton,
                emergencyActions.evidenceSaved && styles.actionButtonCompleted
              ]}
              onPress={() => {
                // Implement the logic to open the file picker for selecting the audio file
              }}
              disabled={isLoading || emergencyActions.evidenceSaved}
            >
              <Ionicons
                name="lock-closed"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {emergencyActions.evidenceSaved ? 'Evidence Saved ✓' : 'Save Voice & Location to Blockchain'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Guardian Alert Section */}
          <View style={styles.guardianAlert}>
            <View style={styles.alertHeader}>
              <Ionicons name="notifications" size={24} color="#FF3B30" />
              <Text style={styles.alertTitle}>Guardians have been notified</Text>
            </View>
            <View style={styles.alertStatus}>
              <Ionicons
                name="notifications"
                size={20}
                color={isAlertActive ? '#4CAF50' : '#FF3B30'}
              />
              <Text style={styles.alertStatusText}>
                {isAlertActive ? 'Alert Active' : 'Alert Stopped'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencySOSScreen;