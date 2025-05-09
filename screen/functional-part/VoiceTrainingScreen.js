import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Alert,
  Image,
  // ActivityIndicator, // Uncomment when implementing loading states
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles-part/VoiceTrainingScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';

// TODO: Import API service for voice training
// import { voiceService } from '../../services/voiceService';

const VoiceTrainingScreen = ({ navigation }) => {
  const [recordings, setRecordings] = useState([null, null, null]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSample, setCurrentSample] = useState(0);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [trainingFailed, setTrainingFailed] = useState(false);
  const pulseAnim = new Animated.Value(1);
  const [showMandatoryModal, setShowMandatoryModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for voice data
  // const [voiceData, setVoiceData] = useState({
  //   samples: [],
  //   isTrained: false
  // });

  // Prevent going back if training is not complete
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isTrainingComplete) {
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();
      // Show custom modal instead of Alert
      setShowMandatoryModal(true);
    });
    return unsubscribe;
  }, [navigation, isTrainingComplete]);

  // TODO: Add useEffect to check if voice training is already completed
  // This will run when the component mounts to check if the user has already completed voice training
  // If completed, it will navigate to the next screen
  // useEffect(() => {
  //   checkVoiceTrainingStatus();
  // }, []);
  
  // TODO: Implement function to check voice training status
  // This function will call the API to check if the user has already completed voice training
  // If completed, it will navigate to the next screen
  // const checkVoiceTrainingStatus = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     // Call API to check if voice training is already completed
  //     const response = await voiceService.getVoiceTrainingStatus();
  //     
  //     if (response.data.isTrained) {
  //       // Voice training is already completed, navigate to next screen
  //       navigation.replace('AddGuardian');
  //     } else {
  //       // Voice training is not completed, show training screen
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     setError('Failed to check voice training status. Please try again.');
  //     console.error(err);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  // TODO: Update handleStartRecording to use actual recording functionality
  // This function will be updated to use the actual recording functionality
  // It will start recording the user's voice and set a timeout to stop recording after 3 seconds
  const handleStartRecording = async (index) => {
    setIsRecording(true);
    setCurrentSample(index);
    
    // TODO: Implement actual recording logic here
    // try {
    //   // Start recording using voice service
    //   await voiceService.startRecording();
    //   
    //   // Set a timeout to stop recording after 3 seconds
    //   setTimeout(() => {
    //     handleStopRecording(index);
    //   }, 3000);
    // } catch (err) {
    //   setError('Failed to start recording. Please try again.');
    //   Alert.alert('Error', 'Failed to start recording. Please try again.');
    //   console.error(err);
    //   setIsRecording(false);
    // }
    
    // Temporary implementation for development
    setTimeout(() => {
      handleStopRecording(index);
    }, 3000); // Simulate 3 second recording
  };

  // TODO: Update handleStopRecording to save the recording
  // This function will be updated to save the recording data
  // It will stop recording and save the recording data to the state
  const handleStopRecording = async (index) => {
    setIsRecording(false);
    
    // TODO: Implement actual recording stop and save logic
    // try {
    //   // Stop recording and get the recording data
    //   const recordingData = await voiceService.stopRecording();
    //   
    //   // Update recordings state with the new recording
    //   const newRecordings = [...recordings];
    //   newRecordings[index] = { 
    //     completed: true,
    //     data: recordingData
    //   };
    //   setRecordings(newRecordings);
    // } catch (err) {
    //   setError('Failed to save recording. Please try again.');
    //   Alert.alert('Error', 'Failed to save recording. Please try again.');
    //   console.error(err);
    // }
    
    // Temporary implementation for development
    const newRecordings = [...recordings];
    newRecordings[index] = { completed: true };
    setRecordings(newRecordings);
  };

  const handleReRecord = (index) => {
    const newRecordings = [...recordings];
    newRecordings[index] = null;
    setRecordings(newRecordings);
    setIsTrainingComplete(false);
  };

  const getProgress = () => {
    return recordings.filter(r => r !== null).length;
  };

  // TODO: Update handleContinue to save voice training data to backend
  // This function will be updated to save the voice training data to the backend
  // It will prepare the voice data and call the API to save it
  const handleContinue = async () => {
    if (getProgress() === 3) {
      // TODO: Implement API call to save voice training data
      // try {
      //   setIsLoading(true);
      //   setError(null);
      //   
      //   // Prepare voice data for API
      //   const voiceSamples = recordings.map(recording => recording.data);
      //   
      //   // Call API to save voice training data
      //   await voiceService.saveVoiceTraining({
      //     samples: voiceSamples
      //   });
      //   
      //   // Update training status
      //   setIsTrainingComplete(true);
      //   
      //   // Show success message
      //   Alert.alert(
      //     'Voice Training Complete',
      //     'Great job! Your voice samples have been saved successfully.',
      //     [
      //       {
      //         text: 'Continue',
      //         onPress: () => navigation.navigate('AddGuardian')
      //       }
      //     ]
      //   );
      // } catch (err) {
      //   setError('Failed to save voice training data. Please try again.');
      //   Alert.alert('Error', 'Failed to save voice training data. Please try again.');
      //   console.error(err);
      // } finally {
      //   setIsLoading(false);
      // }
      
      // Temporary implementation for development
      setIsTrainingComplete(true);
      // Show completion modal instead of Alert
      setShowCompleteModal(true);
    }
  };

  // Call this function when training fails
  const handleTrainingFailed = () => {
    setTrainingFailed(true);
  };

  // Retry handler
  const handleRetry = () => {
    setTrainingFailed(false);
    // Optionally reset other states if needed
  };

  // DEMO ONLY: Show training failed alert on mount. Remove this useEffect after testing.
  useEffect(() => {
    handleTrainingFailed();
  }, []);

  const renderMicButton = (index) => {
    const isComplete = recordings[index]?.completed;
    const isActive = currentSample === index && isRecording;

    return (
      <View style={styles.sampleContainer} key={index}>
        <Text style={styles.sampleText}>Voice Sample {index + 1}</Text>
        <Animated.View
          style={[
            styles.micButtonContainer,
            isActive && { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <TouchableOpacity
            style={[styles.micButton, isComplete && styles.micButtonComplete]}
            onPress={() => !isRecording && handleStartRecording(index)}
            disabled={isRecording} // TODO: Update to disable during API calls: disabled={isRecording || isLoading}
          >
            {isComplete ? (
              <Ionicons name="checkmark" size={24} color="#FFF" />
            ) : (
              <Ionicons name="mic" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
        {/* Re-record option removed as per user request */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Mandatory Training Modal - Remove or update as needed */}
      {showMandatoryModal && (
        <View style={styles.trainingFailedOverlay}>
          <View style={styles.trainingFailedBox}>
            {/* You can replace this with an Image if you have a lock icon asset */}
            <Ionicons name="lock-closed" size={56} color="#FF3B30" style={{ marginBottom: 10 }} />
            {/* Notification dot */}
            <View style={{ position: 'absolute', top: 18, right: 90, backgroundColor: '#FF3B30', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>!</Text>
            </View>
            <Text style={styles.trainingFailedTitle}>Voice Training is Mandatory</Text>
            <Text style={styles.trainingFailedMessage}>
              Your safety matters. To activate emergency features, you must complete voice training.
            </Text>
            <TouchableOpacity style={styles.resumeButton} onPress={() => setShowMandatoryModal(false)}>
              <Ionicons name="mic" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.resumeButtonText}>Resume Training</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Training Failed Alert Modal */}
      {trainingFailed && (
        <View style={styles.trainingFailedOverlay}>
          <View style={styles.trainingFailedBox}>
            <Ionicons name="warning" size={48} color="#FF3B30" style={{ marginBottom: 10 }} />
            <Text style={styles.trainingFailedTitle}>Training Failed</Text>
            <Text style={styles.trainingFailedMessage}>
              We couldn't capture your voice properly.{"\n"}Please find a quiet place and try again.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Training Complete Modal - Remove or update as needed */}
      {showCompleteModal && (
        <View style={styles.trainingFailedOverlay}>
          <View style={styles.trainingFailedBox}>
            {/* Gradient checkmark icon */}
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={36} color="#fff" />
            </View>
            <Text style={styles.trainingFailedTitle}>Voice Training Completed</Text>
            <Text style={styles.trainingFailedMessage}>
              You're all set. Your voice is now registered for emergency detection.
            </Text>
            <TouchableOpacity style={styles.continueAppButton} onPress={() => {
              setShowCompleteModal(false);
              navigation.navigate('AddGuardian');
            }}>
              <Text style={styles.continueAppButtonText}>Continue to App</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FF3B30" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#FF3B30" size={30} />
            <Text style={styles.logoText}>SafeMitra</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* TODO: Add error message display */}
        {/* This will display any error messages from API calls */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}
        
        {/* TODO: Add loading indicator */}
        {/* This will display a loading indicator during API calls */}
        {/* {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF3B30" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )} */}

        <Text style={styles.title}>Voice Training</Text>
        <Text style={styles.subtitle}>
          Record your voice saying 'Help Me' three times
        </Text>

        <View style={styles.micButtonsContainer}>
          {[0, 1, 2].map(renderMicButton)}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(getProgress() / 3) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {getProgress()}/3 completed
          </Text>
        </View>

        <View style={styles.instructionBox}>
          <Ionicons name="information-circle-outline" size={24} color="#666" />
          <Text style={styles.instructionText}>
            Please record in a quiet place for best accuracy.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: getProgress() === 3 ? 1 : 0.7 },
          ]}
          disabled={getProgress() !== 3} // TODO: Update to disable during API calls: disabled={getProgress() !== 3 || isLoading}
          onPress={handleContinue}
        >
          {/* TODO: Show loading indicator during API calls */}
          {/* {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : ( */}
            <>
              <Text style={styles.continueButtonText}>Save & Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </>
          {/* )} */}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceTrainingScreen; 