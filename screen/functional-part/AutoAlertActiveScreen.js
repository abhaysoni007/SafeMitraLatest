import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/AutoAlertActiveScreenStyles';
import { emergencyService } from '../../services/emergency';
import voiceRecordingService from '../../services/voiceRecordingService';

const AutoAlertActiveScreen = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [isEmergency, setIsEmergency] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(60); // 1 minute recording
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [emergencyActions, setEmergencyActions] = useState({
    locationSent: false,
    policeCalled: false,
    ngoCalled: false,
    evidenceSaved: false,
  });

  useEffect(() => {
    const initiateEmergencyProtocol = async () => {
      try {
        setIsLoading(true);
        await emergencyService.initiateEmergency();

        // Start recording when emergency is initiated
        const recordingStarted = await voiceRecordingService.startRecording();
        if (recordingStarted) {
          setIsRecording(true);
          setRecordingStatus('Recording started');
        }
      } catch (err) {
        setError('Failed to initiate emergency protocol');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initiateEmergencyProtocol();

    // Timer for alert countdown
    const alertTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(alertTimer);
          handleEmergencyTrigger();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Timer for recording duration
    const recordingTimer = setInterval(() => {
      setRecordingTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(recordingTimer);
          handleStopRecording();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(alertTimer);
      clearInterval(recordingTimer);
      // Stop recording if component unmounts
      if (isRecording) {
        handleStopRecording();
      }
    };
  }, []);

  const handleStopRecording = async () => {
    if (isRecording) {
      const recordingPath = await voiceRecordingService.stopAndSaveRecording();
      if (recordingPath) {
        setRecordingStatus('Recording saved');
        // Upload the recording
        const uploadSuccess = await voiceRecordingService.uploadRecording(recordingPath);
        if (uploadSuccess) {
          setRecordingStatus('Recording uploaded');
          setShowSuccessModal(true); // Show success modal
        } else {
          setRecordingStatus('Upload failed');
        }
      }
      setIsRecording(false);
    }
  };

  const handleEmergencyTrigger = async () => {
    setIsEmergency(true);
    try {
      setIsLoading(true);
      await emergencyService.confirmEmergency();

      // Simulate each action delay (optional: add loading per action if needed)
      setEmergencyActions({
        locationSent: true,
        policeCalled: true,
        ngoCalled: true,
        evidenceSaved: true,
      });
    } catch (err) {
      setError('Failed to confirm emergency');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEmergency = async () => {
    try {
      setIsLoading(true);
      // Stop recording if it's still active
      if (isRecording) {
        await handleStopRecording();
      }
      await emergencyService.cancelEmergency();
      navigation.goBack();
    } catch (err) {
      setError('Failed to cancel emergency');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => `${seconds}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>Recording Complete!</Text>
            <Text style={styles.modalMessage}>
              Your emergency recording has been successfully saved and uploaded.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      <ScrollView contentContainerStyle={styles.content}>
        {/* Alert Header */}
        <View style={styles.alertHeader}>
          <View style={styles.alertIconContainer}>
            <Ionicons name="alert-circle" size={40} color="#FF3B30" />
          </View>
          <Text style={styles.alertTitle}>Auto Alert Triggered</Text>
          <Text style={styles.alertMessage}>
            We detected a trained hotword and triggered emergency actions. If this was accidental, you can cancel it within {timeLeft} seconds.
          </Text>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Recording Status */}
        {isRecording && (
          <View style={styles.recordingStatus}>
            <Ionicons name="mic" size={24} color="#FF3B30" />
            <Text style={styles.recordingStatusText}>
              {recordingStatus} ({recordingTimeLeft}s remaining)
            </Text>
          </View>
        )}

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        {/* Cancel Button */}
        {!isEmergency && (
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEmergency}>
            <Text style={styles.cancelButtonText}>Cancel Alert</Text>
          </TouchableOpacity>
        )}

        {/* Status Section */}
        {isEmergency && (
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>Status Updates</Text>

            <View style={styles.statusItem}>
              <Ionicons
                name={emergencyActions.locationSent ? 'checkmark-circle' : 'time'}
                size={24}
                color={emergencyActions.locationSent ? 'green' : '#FF9500'}
              />
              <Text style={styles.statusText}>Location sent to guardians</Text>
            </View>

            <View style={styles.statusItem}>
              <Ionicons
                name={emergencyActions.policeCalled ? 'checkmark-circle' : 'time'}
                size={24}
                color={emergencyActions.policeCalled ? 'green' : '#FF9500'}
              />
              <Text style={styles.statusText}>Police notified</Text>
            </View>

            <View style={styles.statusItem}>
              <Ionicons
                name={emergencyActions.ngoCalled ? 'checkmark-circle' : 'time'}
                size={24}
                color={emergencyActions.ngoCalled ? 'green' : '#FF9500'}
              />
              <Text style={styles.statusText}>NGO notified</Text>
            </View>

            <View style={styles.statusItem}>
              <Ionicons
                name={emergencyActions.evidenceSaved ? 'checkmark-circle' : 'time'}
                size={24}
                color={emergencyActions.evidenceSaved ? 'green' : '#FF9500'}
              />
              <Text style={styles.statusText}>Evidence saved to blockchain</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AutoAlertActiveScreen;
