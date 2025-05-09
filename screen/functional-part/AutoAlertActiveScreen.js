import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/AutoAlertActiveScreenStyles';

// TODO: Import API service for emergency operations
// import { emergencyService } from '../../services/emergencyService';

const AutoAlertActiveScreen = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [isEmergency, setIsEmergency] = useState(false);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for tracking emergency actions
  // This state will track the status of various emergency actions taken during an auto-triggered emergency
  // It will be updated as each action is completed successfully
  // The data structure includes:
  // - locationSent: Boolean indicating if the user's location has been sent to guardians
  // - policeCalled: Boolean indicating if police has been notified
  // - ngoCalled: Boolean indicating if NGO has been notified
  // - evidenceSaved: Boolean indicating if evidence (voice, location) has been saved to blockchain
  // This data will be used to update the UI to show which actions have been completed
  // and to provide visual feedback to the user about the progress of emergency actions
  // const [emergencyActions, setEmergencyActions] = useState({
  //   locationSent: false,
  //   policeCalled: false,
  //   ngoCalled: false,
  //   evidenceSaved: false
  // });

  // Temporary state for development - will be replaced with emergencyActions when implemented
  const [actionsCompleted, setActionsCompleted] = useState(false);

  useEffect(() => {
    // TODO: Add API call to initiate emergency protocol
    // This function will be called when the component mounts
    // It will initiate the emergency protocol and start the countdown
    // const initiateEmergencyProtocol = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await emergencyService.initiateEmergency();
    //     // Handle response
    //   } catch (err) {
    //     setError('Failed to initiate emergency protocol');
    //     console.error(err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // initiateEmergencyProtocol();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsEmergency(true);
          // Set actions as completed when timer reaches zero (for development)
          setActionsCompleted(true);
          
          // TODO: Add API call to confirm emergency when timer expires
          // This function will be called when the countdown reaches zero
          // It will confirm the emergency and start the emergency actions
          // const confirmEmergency = async () => {
          //   try {
          //     setIsLoading(true);
          //     await emergencyService.confirmEmergency();
          //     // Update emergency actions status
          //     setEmergencyActions(prev => ({
          //       ...prev,
          //       locationSent: true,
          //       policeCalled: true,
          //       ngoCalled: true,
          //       evidenceSaved: true
          //     }));
          //   } catch (err) {
          //     setError('Failed to confirm emergency');
          //     console.error(err);
          //   } finally {
          //     setIsLoading(false);
          //   }
          // };
          // 
          // confirmEmergency();
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    return `${seconds}`;
  };

  // TODO: Add function to cancel emergency
  // This function will be called when the user presses the Cancel Alert button
  // It will cancel the emergency and stop all emergency actions
  // const cancelEmergency = async () => {
  //   try {
  //     setIsLoading(true);
  //     await emergencyService.cancelEmergency();
  //     navigation.goBack();
  //   } catch (err) {
  //     setError('Failed to cancel emergency');
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

      <View style={styles.content}>
        {/* Alert Header */}
        <View style={styles.alertHeader}>
          <View style={styles.alertIconContainer}>
            <Ionicons name="alert-circle" size={40} color="#FF3B30" />
          </View>
          <Text style={styles.alertTitle}>
            Auto Alert Triggered
          </Text>
          <Text style={styles.alertMessage}>
            We detected a trained hotword and triggered emergency actions. If this was accidental, you can cancel it within {timeLeft} seconds.
          </Text>
        </View>

        {/* Loading Indicator */}
        {/* TODO: Add loading indicator when API calls are in progress */}
        {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />} */}

        {/* Error Message */}
        {/* TODO: Add error message display */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        {!isEmergency && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>
              Cancel Alert
            </Text>
          </TouchableOpacity>
        )}

        {/* Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>
            Status Updates
          </Text>
          <View style={styles.statusItem}>
            <Ionicons
              name={actionsCompleted ? "checkmark-circle" : "time"}
              size={24}
              color={actionsCompleted ? "#4CAF50" : "#FFA000"}
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>
              Location sent to Guardians
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons
              name={actionsCompleted ? "checkmark-circle" : "time"}
              size={24}
              color={actionsCompleted ? "#4CAF50" : "#FFA000"}
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>
              Calling Police & NGO
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons
              name={actionsCompleted ? "checkmark-circle" : "time"}
              size={24}
              color={actionsCompleted ? "#4CAF50" : "#FFA000"}
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>
              Evidence Saved to Blockchain
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AutoAlertActiveScreen; 