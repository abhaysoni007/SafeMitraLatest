import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/HotwordDetectionScreenStyles';

const HOTWORDS = ['sos', 'help', 'bachaao'];
const COOLDOWN_PERIOD = 15000; // 15 seconds
const HotwordDetectionScreen = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingRecordings, setPendingRecordings] = useState([]);

  const recordingRef = useRef(null);
  const isRecordingRef = useRef(false);
  const processingRef = useRef(false);
  const lastTriggeredRef = useRef(0);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const netInfo = await NetInfo.fetch();
        setIsOnline(Boolean(netInfo.isConnected));
        console.log('Network status:', netInfo.isConnected ? 'Online' : 'Offline');
      } catch (error) {
        console.log('Network check failed:', error);
        setIsOnline(false);
      }
    };

    checkConnectivity();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(Boolean(state.isConnected));
      console.log('Network status changed:', state.isConnected ? 'Online' : 'Offline');
    });

    return () => {
      unsubscribe();
      stopRecording();
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false
      });
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [pendingRecordings]);

  const handleSOSStatus = (isActive) => {
    const now = Date.now();
    if (isActive && now - lastTriggeredRef.current < COOLDOWN_PERIOD) {
      console.log('SOS trigger on cooldown');
      return;
    }

    lastTriggeredRef.current = now;

    if (isActive) {
      console.log('🚨 SOS TRIGGERED SUCCESSFULLY!');
      navigation.navigate('AutoAlertActive');
    } else {
      console.log('SOS Status: Deactivated');
    }
  };

  async function startRecording() {
    try {
      if (isRecordingRef.current || processingRef.current) {
        console.log('Recording or processing already in progress');
        return;
      }

      if (!isOnline) {
        console.log('No Internet Connection. Recording will be stored and processed when online.');
      }

      setIsLoading(true);
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Microphone permission not granted');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setRecording(recording);
      setIsListening(true);
      isRecordingRef.current = true;
      console.log('Recording started');

      setTimeout(async () => {
        if (isRecordingRef.current) {
          await processRecording();
        }
      }, 5000);

    } catch (err) {
      console.error('Failed to start recording:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function stopRecording() {
    try {
      setIsLoading(true);
      isRecordingRef.current = false;
      processingRef.current = false;

      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }
      if (recording) {
        await recording.stopAndUnloadAsync();
      }

      handleSOSStatus(false);
    } catch (err) {
      console.error('Error stopping recording:', err);
    } finally {
      setIsLoading(false);
      setRecording(null);
      setIsListening(false);
    }
  }

  async function processRecording(uri = null) {
    if (processingRef.current) {
      console.log('Already processing a recording');
      return;
    }

    try {
      processingRef.current = true;

      if (!recordingRef.current && !uri) {
        processingRef.current = false;
        return;
      }

      const recordingUri = uri || recordingRef.current.getURI();
      console.log('Processing recording from:', recordingUri);

      if (!isOnline) {
        const pendingPath = `${FileSystem.documentDirectory}pending_recording_${Date.now()}.m4a`;
        await FileSystem.copyAsync({ from: recordingUri, to: pendingPath });
        setPendingRecordings(prev => [...prev, { uri: pendingPath, timestamp: Date.now() }]);
        console.log('Recording saved for later processing:', pendingPath);
        processingRef.current = false;
        return;
      }

      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        isRecordingRef.current = false;
      }

      const mockTranscript = 'This is a simulated transcript. Say "help" or "sos" to test.';
      setTranscript(mockTranscript);
      console.log('Transcript:', mockTranscript);

      const matched = HOTWORDS.find(word =>
        mockTranscript.toLowerCase().includes(word)
      );

      if (matched) {
        console.log('🚨 SOS Triggered: Hotword Detected →', matched);
        handleSOSStatus(true);
      }

      if (!isRecordingRef.current) {
        startRecording();
      }

    } catch (err) {
      console.error('Error processing recording:', err);
    } finally {
      processingRef.current = false;
    }
  }

  const toggleHotwordDetection = async () => {
    if (debounceTimeoutRef.current) return;

    debounceTimeoutRef.current = setTimeout(() => {
      debounceTimeoutRef.current = null;
    }, 2000);

    if (isListening) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.content}>
        {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />}

        <View style={styles.hotwordCard}>
          <View style={styles.statusIndicator}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isListening ? '#4CAF50' : '#FF3B30' }
            ]} />
            <Text style={styles.statusText}>
              {isListening ? 'Status: Listening' : 'Status: Paused'}
            </Text>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleHotwordDetection}
              disabled={isLoading || Boolean(debounceTimeoutRef.current)}
            >
              <Text style={styles.toggleButtonText}>
                {isListening ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="mic" size={40} color="#FF3B30" />
              <View style={styles.waveformContainer}>
                <View style={[styles.waveform, styles.waveform1]} />
                <View style={[styles.waveform, styles.waveform2]} />
                <View style={[styles.waveform, styles.waveform3]} />
              </View>
            </View>

            <Text style={styles.title}>Voice Hotword Detection</Text>
            <Text style={styles.description}>
              SafeMitra is listening for emergency keywords: "SOS", "Help", "Bachaao"
            </Text>

            {!isOnline && (
              <Text style={[styles.description, { color: '#FF3B30' }]}>
                No internet connection. Recordings will be processed when online.
              </Text>
            )}

            {pendingRecordings.length > 0 && (
              <Text style={[styles.description, { color: '#FFA500' }]}>
                {pendingRecordings.length} recording(s) waiting to be processed
              </Text>
            )}

            {transcript ? (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptLabel}>Last Transcript:</Text>
                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={styles.transcriptText}
                >
                  {transcript}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HotwordDetectionScreen;
