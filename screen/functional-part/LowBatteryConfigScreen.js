import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles-part/LowBatteryConfigScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import Slider from '@react-native-community/slider';

// TODO: Import API service for battery configuration
// import { batteryService } from '../../services/batteryService';

const LowBatteryConfigScreen = ({ navigation }) => {
  const [isLowBatteryModeEnabled, setIsLowBatteryModeEnabled] = useState(true);
  const [batteryThreshold, setBatteryThreshold] = useState(15);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for battery configuration
  // const [batteryConfig, setBatteryConfig] = useState({
  //   isEnabled: true,
  //   threshold: 15,
  //   notifyGuardians: true,
  //   powerSavingMode: true,
  //   lastUpdated: null
  // });

  // TODO: Add useEffect to fetch battery configuration
  // useEffect(() => {
  //   const fetchBatteryConfig = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await batteryService.getBatteryConfig();
  //       setBatteryConfig(response.data);
  //       setIsLowBatteryModeEnabled(response.data.isEnabled);
  //       setBatteryThreshold(response.data.threshold);
  //     } catch (err) {
  //       setError('Failed to load battery configuration');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   
  //   fetchBatteryConfig();
  // }, []);

  // TODO: Update handleSave to use API
  const handleSave = async () => {
    // TODO: Implement API call to save battery configuration
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   // Call API to save battery configuration
    //   await batteryService.saveBatteryConfig({
    //     isEnabled: isLowBatteryModeEnabled,
    //     threshold: batteryThreshold,
    //     notifyGuardians: true,
    //     powerSavingMode: true
    //   });
    //   
    //   // Show success message
    //   Alert.alert(
    //     'Settings Saved',
    //     'Your low battery configuration has been updated successfully.',
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => navigation.navigate('SecretCodeSetup')
    //       }
    //     ]
    //   );
    // } catch (err) {
    //   setError('Failed to save battery configuration');
    //   Alert.alert(
    //     'Error',
    //     'Failed to save your low battery configuration. Please try again.',
    //     [{ text: 'OK' }]
    //   );
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Show success modal instead of Alert
    setShowSuccessModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Settings Saved Success Modal - Remove or update as needed */}
      {showSuccessModal && (
        <View style={styles.trainingFailedOverlay}>
          <View style={styles.trainingFailedBox}>
            {/* Gradient checkmark icon */}
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={36} color="#fff" />
            </View>
            <Text style={styles.trainingFailedTitle}>Settings Saved Successfully</Text>
            <Text style={styles.trainingFailedMessage}>
              Your low battery alert settings have been saved.
            </Text>
            <TouchableOpacity style={styles.continueAppButton} onPress={() => {
              setShowSuccessModal(false);
              navigation.navigate('SecretCodeSetup');
            }}>
              <Text style={styles.continueAppButtonText}>Continue</Text>
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

        <Text style={styles.title}>Low Battery Configuration</Text>
        <Text style={styles.subtitle}>
          Enable SOS triggers when your battery runs low
        </Text>

        {/* Error Message */}
        {/* TODO: Add error message display */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Activate Low Battery SOS Mode</Text>
          <Switch
            value={isLowBatteryModeEnabled}
            onValueChange={setIsLowBatteryModeEnabled}
            trackColor={{ false: '#E0E0E0', true: '#FF3B30' }}
            thumbColor="#FFFFFF"
            // TODO: Update to disable during API calls: disabled={isLoading}
          />
        </View>

        {isLowBatteryModeEnabled && (
          <>
            <View style={styles.thresholdContainer}>
              <Text style={styles.thresholdLabel}>Set Battery Level Threshold</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={5}
                maximumValue={20}
                step={5}
                value={batteryThreshold}
                onValueChange={setBatteryThreshold}
                minimumTrackTintColor="#FF3B30"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#FF3B30"
                // TODO: Update to disable during API calls: disabled={isLoading}
              />
              <Text style={styles.thresholdValue}>{batteryThreshold}%</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                When your battery drops below the selected level, your live location will be shared with your guardians, and the app will enter power-saving emergency mode.
              </Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={[
            styles.saveButton,
            // TODO: Update to show loading state: { opacity: isLoading ? 0.7 : 1 }
            { opacity: 1 }
          ]}
          onPress={handleSave}
          // TODO: Update to disable during API calls: disabled={isLoading}
        >
          {/* TODO: Show loading indicator during API calls */}
          {/* {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : ( */}
            <>
              <Text style={styles.saveButtonText}>Save & Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </>
          {/* )} */}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LowBatteryConfigScreen; 