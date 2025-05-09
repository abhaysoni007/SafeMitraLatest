import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

let recording = null;

const voiceRecordingService = {
  startRecording: async () => {
    try {
      // Stop any existing recording first
      if (recording) {
        await recording.stopAndUnloadAsync();
        recording = null;
      }

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Microphone access is required.');
        return false;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recording = newRecording;
      console.log('🎙 Recording started');
      return true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      return false;
    }
  },

  stopAndSaveRecording: async () => {
    try {
      if (!recording) return null;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('🛑 Recording stopped. URI:', uri);

      const localPath = `${FileSystem.documentDirectory}lastRecording.m4a`;
      await FileSystem.moveAsync({ from: uri, to: localPath });

      recording = null;
      return localPath;
    } catch (error) {
      console.error('❌ Error stopping recording:', error);
      return null;
    }
  },

  uploadRecording: async (fileUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.error('Recording file not found.');
        return false;
      }

      const formData = new FormData();
      formData.append('audio', {
        uri: fileUri,
        name: 'recording.m4a',
        type: 'audio/m4a',
      });

      // Try to upload to the server
      const response = await fetch('http://192.168.137.153:3001/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // Removed explicit 'Content-Type' header
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to upload');
      }

      const resData = await response.json();
      console.log('✅ Upload successful! Saved as:', resData.filename);
      return true;
    } catch (error) {
      console.error('❌ Upload failed:', error);
      Alert.alert(
        'Upload Failed',
        'Failed to upload recording. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  },
};

export default voiceRecordingService;