import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/HotwordDetectionScreenStyles';

// TODO: Import API service for hotword operations
// import { hotwordService } from '../../services/hotwordService';

const HotwordDetectionScreen = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(true);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for hotword detection status
  // const [hotwordStatus, setHotwordStatus] = useState({
  //   isActive: true,
  //   trainedHotword: "Help Me SafeMitra",
  //   lastDetected: null,
  //   detectionCount: 0
  // });
  
  // This would come from your app's state or API
  const trainedHotword = "Help Me SafeMitra";

  // TODO: Add useEffect to fetch hotword detection status
  // useEffect(() => {
  //   const fetchHotwordStatus = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await hotwordService.getHotwordStatus();
  //       setHotwordStatus(response.data);
  //       setIsListening(response.data.isActive);
  //     } catch (err) {
  //       setError('Failed to load hotword detection status');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   
  //   fetchHotwordStatus();
  // }, []);

  useEffect(() => {
    console.log('HotwordDetectionScreen mounted');
    
    // TODO: Add real-time hotword detection listener
    // const startHotwordDetection = async () => {
    //   try {
    //     await hotwordService.startHotwordDetection();
    //     
    //     // Set up listener for hotword detection events
    //     hotwordService.onHotwordDetected((data) => {
    //       // Handle hotword detection event
    //       console.log('Hotword detected:', data);
    //       navigation.navigate('AutoAlertActive');
    //     });
    //   } catch (err) {
    //     setError('Failed to start hotword detection');
    //     console.error(err);
    //   }
    // };
    // 
    // startHotwordDetection();
    // 
    // return () => {
    //   // Clean up listener when component unmounts
    //   hotwordService.stopHotwordDetection();
    // };
  }, []);

  // TODO: Add function to toggle hotword detection
  // const toggleHotwordDetection = async () => {
  //   try {
  //     setIsLoading(true);
  //     if (isListening) {
  //       await hotwordService.pauseHotwordDetection();
  //     } else {
  //       await hotwordService.resumeHotwordDetection();
  //     }
  //     setIsListening(!isListening);
  //   } catch (err) {
  //     setError(`Failed to ${isListening ? 'pause' : 'resume'} hotword detection`);
  //     Alert.alert('Error', `Failed to ${isListening ? 'pause' : 'resume'} hotword detection`);
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

      {/* Content */}
      <View style={styles.content}>
        {/* Loading Indicator */}
        {/* TODO: Add loading indicator when API calls are in progress */}
        {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />} */}

        {/* Error Message */}
        {/* TODO: Add error message display */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}

        <View style={styles.hotwordCard}>
          {/* Status Indicator */}
          <View style={styles.statusIndicator}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isListening ? '#4CAF50' : '#FF3B30' }
            ]} />
            <Text style={styles.statusText}>
              {isListening ? 'Status: Listening' : 'Status: Paused'}
            </Text>
            
            {/* Toggle Button */}
            {/* TODO: Add toggle button for hotword detection */}
            {/* <TouchableOpacity 
              style={styles.toggleButton}
              onPress={toggleHotwordDetection}
            >
              <Text style={styles.toggleButtonText}>
                {isListening ? 'Pause' : 'Resume'}
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="mic" size={40} color="#FF3B30" />
              <View style={styles.waveformContainer}>
                <View style={[styles.waveform, styles.waveform1]} />
                <View style={[styles.waveform, styles.waveform2]} />
                <View style={[styles.waveform, styles.waveform3]} />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Listening for Your Hotword</Text>

            {/* Description */}
            <Text style={styles.description}>
              SafeMitra is actively listening for your trained voice command to ensure immediate SOS activation when needed.
            </Text>

            {/* Hotword Display */}
            <View style={styles.hotwordDisplay}>
              <Text style={styles.hotwordLabel}>Trained Hotword:</Text>
              <Text style={styles.hotwordText}>
                {/* TODO: Replace with dynamic hotword from API */}
                {trainedHotword}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HotwordDetectionScreen; 