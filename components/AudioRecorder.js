import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, AppState, ToastAndroid, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { sendAudioToBackend } from '../services/audioService';

// Shorter recordings for faster SOS response
const RECORDING_DURATION_MS = 15 * 1000; // 15 seconds
const MAX_RETRY_ATTEMPTS = 3;

const AudioRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('initializing'); // 'initializing', 'recording', 'uploading', 'error'
  const appState = useRef(AppState.currentState);
  const uploadAttempts = useRef(0);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'background' && nextAppState === 'active') {
        // App came back to foreground, restart recording if needed
        if (!isRecording && !isUploading) {
          startRecording();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isRecording, isUploading]);

  useEffect(() => {
    requestPermissions();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync().catch(error => {
          console.error('Error stopping recording on unmount:', error);
        });
      }
    };
  }, []);

  const showNotification = (message) => {
    if (Platform.OS === 'android') {
      // For Android, use console.log since ToastAndroid is not available in web
      console.log(`[Android] ${message}`);
    } else if (Platform.OS === 'web') {
      // For web, use console.log with a timestamp
      console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    } else {
      // For iOS and other platforms
      console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    }
  };

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        startRecording();
      } else {
        setStatus('error');
        showNotification('Microphone permission denied');
      }
    } catch (error) {
      console.error('Failed to get permissions:', error);
      setStatus('error');
      // Retry permissions after a delay
      setTimeout(requestPermissions, 3000);
    }
  };

  const startRecording = async () => {
    try {
      if (isRecording) {
        console.log('Already recording, skipping startRecording call');
        return;
      }

      setStatus('recording');
      setIsRecording(true);
      
      // Use specific audio recording settings that are known to work well
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/mp4',
          bitsPerSecond: 128000,
        }
      });
      
      setRecording(recording);
      
      // Set a timeout to stop recording after RECORDING_DURATION_MS
      setTimeout(() => {
        if (recording) {
          stopRecording(recording).catch(error => {
            console.error('Error in stopRecording from timeout:', error);
            setIsRecording(false);
            startRecording(); // Try to restart
          });
        }
      }, RECORDING_DURATION_MS);
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      setStatus('error');
      setIsRecording(false);
      // Try to restart recording after a delay
      setTimeout(startRecording, 2000);
    }
  };

  const stopRecording = async (rec) => {
    if (!rec) {
      console.error('No recording to stop');
      setIsRecording(false);
      startRecording();
      return;
    }
    
    try {
      setIsRecording(false);
      setIsUploading(true);
      setStatus('uploading');
      
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      
      if (!uri) {
        throw new Error('Recording URI is null');
      }
      
      console.log(`Attempting to upload recording: ${uri}`);
      // Send to backend
      const result = await sendAudioToBackend(uri);
      
      // Show success notification
      showNotification(`Audio uploaded: ${result.filename}`);
      
      // Reset upload attempts on success
      uploadAttempts.current = 0;
      setIsUploading(false);
      
      // Start next recording
      startRecording();
      
    } catch (error) {
      console.error('Error handling recording:', error);
      setIsUploading(false);
      setStatus('error');
      
      // Show error notification
      showNotification(`Upload failed: ${error.message}`);
      
      uploadAttempts.current += 1;
      
      if (uploadAttempts.current <= MAX_RETRY_ATTEMPTS) {
        // Retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(1.5, uploadAttempts.current), 5000);
        console.log(`Retrying recording in ${delay}ms (attempt ${uploadAttempts.current}/${MAX_RETRY_ATTEMPTS})`);
        setTimeout(startRecording, delay);
      } else {
        // After MAX_RETRY_ATTEMPTS, just continue recording without trying to upload
        console.log('Max retry attempts reached, continuing with new recording');
        uploadAttempts.current = 0;
        startRecording();
      }
    }
  };

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.indicator}>
        <View 
          style={[
            styles.dot, 
            status === 'recording' ? styles.recordingDot : 
            status === 'uploading' ? styles.uploadingDot : 
            status === 'error' ? styles.errorDot : styles.initDot
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  indicator: {
    padding: 8,
    marginTop: 10,
    marginRight: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  initDot: {
    backgroundColor: '#888',
  },
  recordingDot: {
    backgroundColor: '#4CAF50', // Green
  },
  uploadingDot: {
    backgroundColor: '#2196F3', // Blue
  },
  errorDot: {
    backgroundColor: '#F44336', // Red
  }
});

export default AudioRecorder; 