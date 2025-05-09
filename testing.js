import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const ASSEMBLY_API_KEY = 'YOUR_ASSEMBLY_AI_API_KEY_HERE';
const HOTWORDS = ['sos', 'help', 'bachaao'];

export default function App() {
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');
  const recordingRef = useRef(null);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording...');
    setRecording(undefined);
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI();
    console.log('Recording stopped and stored at', uri);

    // Upload audio to AssemblyAI
    const base64Audio = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const audioBuffer = Buffer.from(base64Audio, 'base64');
    const uploadUrl = await uploadToAssembly(audioBuffer);

    if (uploadUrl) {
      const transcriptText = await transcribeWithAssembly(uploadUrl);
      setTranscript(transcriptText);

      const matched = HOTWORDS.find(word =>
        transcriptText.toLowerCase().includes(word)
      );

      if (matched) {
        console.log('🚨 SOS Triggered: Hotword Detected →', matched);
      } else {
        console.log('No hotword detected.');
      }
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

      // Poll for transcription result
      let completed = false;
      let transcriptText = '';
      while (!completed) {
        await new Promise(res => setTimeout(res, 3000));
        const pollingRes = await fetch(
          https://api.assemblyai.com/v2/transcript/${transcriptId},
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
      return '';
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AssemblyAI Hotword Detector</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text style={{ marginTop: 20 }}>{transcript}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});