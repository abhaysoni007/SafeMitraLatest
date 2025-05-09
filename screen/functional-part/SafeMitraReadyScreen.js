import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/SafeMitraReadyScreenStyles';

// TODO: Import API service for SafeMitra status
// import { safeMitraService } from '../../services/safeMitraService';

const SafeMitraReadyScreen = () => {
  const navigation = useNavigation();
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for feature status
  // const [featureStatus, setFeatureStatus] = useState({
  //   voiceTrained: false,
  //   guardiansConnected: false,
  //   secretCodeLocked: false
  // });

  // TODO: Add useEffect to fetch SafeMitra status on component mount
  // useEffect(() => {
  //   fetchSafeMitraStatus();
  // }, []);
  
  // TODO: Implement function to fetch SafeMitra status
  // const fetchSafeMitraStatus = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     // Call API to get SafeMitra status
  //     const response = await safeMitraService.getStatus();
  //     
  //     // Update feature status
  //     setFeatureStatus({
  //       voiceTrained: response.data.voiceTrained,
  //       guardiansConnected: response.data.guardiansConnected,
  //       secretCodeLocked: response.data.secretCodeLocked
  //     });
  //     
  //     // Update monitoring status
  //     setIsMonitoring(response.data.isMonitoring);
  //   } catch (err) {
  //     setError('Failed to fetch SafeMitra status. Please try again.');
  //     Alert.alert('Error', 'Failed to fetch SafeMitra status. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // TODO: Update toggle monitoring function to use API
  const handleToggleMonitoring = async (value) => {
    // TODO: Implement API call to update monitoring status
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   // Call API to update monitoring status
    //   await safeMitraService.updateMonitoringStatus(value);
    //   
    //   // Update local state
    //   setIsMonitoring(value);
    //   
    //   // Show success message
    //   Alert.alert(
    //     'Status Updated',
    //     value 
    //       ? 'SafeMitra is now actively monitoring for SOS triggers.' 
    //       : 'Monitoring is paused. You can resume anytime.',
    //     [{ text: 'OK' }]
    //   );
    // } catch (err) {
    //   setError('Failed to update monitoring status. Please try again.');
    //   Alert.alert('Error', 'Failed to update monitoring status. Please try again.');
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
    
    // Temporary state update for development
    setIsMonitoring(value);
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
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}
          
          {/* Loading Indicator */}
          {/* TODO: Add loading indicator */}
          {/* {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF3B30" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )} */}

          {/* Top Section */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>

          <Text style={styles.title}>SafeMitra is All Set!</Text>

          {/* Subtext */}
          <Text style={styles.subtext}>
            Your voice is trained, guardians are added, and your secret code is secured.
          </Text>
          <Text style={styles.subtext}>
            SafeMitra will now run in the background, always ready to protect you.
          </Text>

          {/* Feature Confirmation List */}
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                {/* TODO: Use dynamic status from API */}
                {/* {featureStatus.voiceTrained ? '✅' : '❌'} Voice Hotword Trained */}
                ✅ Voice Hotword Trained
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                {/* TODO: Use dynamic status from API */}
                {/* {featureStatus.guardiansConnected ? '✅' : '❌'} Guardians Connected */}
                ✅ Guardians Connected
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                {/* TODO: Use dynamic status from API */}
                {/* {featureStatus.secretCodeLocked ? '✅' : '❌'} Secret Code Locked */}
                ✅ Secret Code Locked
              </Text>
            </View>
          </View>

          {/* Information Block */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Note: SafeMitra does not require the internet to function.
            </Text>
            <Text style={styles.infoText}>
              Your safety features are active even in offline mode.
            </Text>
          </View>

          {/* Toggle Monitoring Switch */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleHeader}>
              <Text style={styles.toggleLabel}>Background Monitoring</Text>
              <Switch
                value={isMonitoring}
                onValueChange={handleToggleMonitoring}
                trackColor={{ false: '#767577', true: '#FF3B30' }}
                thumbColor={isMonitoring ? '#FF3B30' : '#f4f3f4'}
                disabled={false} // TODO: Disable during API calls
              />
            </View>
            <Text style={styles.toggleStatus}>
              {isMonitoring
                ? 'SafeMitra is actively monitoring for SOS triggers.'
                : 'Monitoring is paused. You are currently safe.'}
            </Text>
            <Text style={styles.toggleTip}>
              Switch ON when you're in public or feel unsafe.
            </Text>
          </View>

          {/* Open Dashboard Button */}
          <TouchableOpacity
            style={styles.dashboardButton}
            onPress={() => navigation.navigate('Dashboard')}
            disabled={false} // TODO: Disable during API calls
          >
            <Text style={styles.buttonText}>Open Dashboard</Text>
          </TouchableOpacity>

          {/* Navigation Tip */}
          <Text style={styles.navigationTip}>
            You can always reopen SafeMitra from your app tray.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafeMitraReadyScreen; 