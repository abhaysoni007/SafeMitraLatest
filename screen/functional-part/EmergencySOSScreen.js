import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Text, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/EmergencySOSScreenStyles';

// Import services
import emergencyService from '../../services/emergencyService';
import locationService from '../../services/locationService';

const EmergencySOSScreen = () => {
  const navigation = useNavigation();
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [sosDuration, setSosDuration] = useState(0);
  
  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for API error handling
  const [error, setError] = useState(null);
  
  // Location data state
  const [locationData, setLocationData] = useState(null);
  
  // State for tracking emergency actions
  const [emergencyActions, setEmergencyActions] = useState({
    locationSent: false,
    policeCalled: false,
    ngoCalled: false,
    evidenceSaved: false,
    locationTracking: false
  });

  // Initiate emergency protocol when screen loads
  useEffect(() => {
    const initiateEmergency = async () => {
      try {
        setIsLoading(true);
        setIsAlertActive(true);
        
        // Request location permissions first if not already granted
        await locationService.requestPermissions();
        
        // Initiate SOS with emergency location tracking
        const response = await emergencyService.initiateSOS();
        console.log('Emergency initiated:', response);
        
        // Set emergency actions status
        setEmergencyActions(prev => ({
          ...prev,
          locationTracking: true
        }));
      } catch (err) {
        setError('Failed to initiate emergency protocol: ' + err.message);
        console.error('Failed to initiate emergency:', err);
        Alert.alert('Emergency Error', 'Failed to initiate emergency. ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    initiateEmergency();
    
    // Clean up when component unmounts
    return () => {
      // Only stop emergency if user navigates away without explicitly stopping
      if (isAlertActive) {
        emergencyService.stopEmergencyAlert().catch(err => {
          console.error('Error stopping emergency on unmount:', err);
        });
      }
    };
  }, []);

  // Set up location update listener
  useEffect(() => {
    // Set up listener for location updates
    const locationUpdateCallback = (data) => {
      setLocationData(data);
      console.log('Location updated:', data);
    };
    
    locationService.onLocationUpdate(locationUpdateCallback);
    
    // Get initial location immediately
    locationService.getCurrentLocation()
      .then(location => {
        setLocationData(location);
      })
      .catch(err => {
        console.error('Error getting initial location:', err);
      });
    
    return () => {
      // Clean up by setting the callback to null
      locationService.onLocationUpdate(null);
    };
  }, []);

  // Timer for SOS duration
  useEffect(() => {
    // Only start the timer if alert is active
    if (!isAlertActive) return;
    
    const timer = setInterval(() => {
      setSosDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isAlertActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Send location to guardians
  const sendLocationToGuardians = async () => {
    if (emergencyActions.locationSent) {
      Alert.alert('Already Sent', 'Location has already been sent to guardians');
      return;
    }
    
    try {
      setIsLoading(true);
      await emergencyService.sendLocationToGuardians();
      setEmergencyActions(prev => ({ ...prev, locationSent: true }));
      Alert.alert('Success', 'Location sent to guardians successfully');
    } catch (err) {
      setError('Failed to send location to guardians: ' + err.message);
      Alert.alert('Error', 'Failed to send location to guardians: ' + err.message);
      console.error('Error sending location to guardians:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Call police and NGO
  const callPoliceAndNGO = async () => {
    if (emergencyActions.policeCalled && emergencyActions.ngoCalled) {
      Alert.alert('Already Notified', 'Police and NGO have already been notified');
      return;
    }
    
    try {
      setIsLoading(true);
      await emergencyService.callPoliceAndNGO();
      setEmergencyActions(prev => ({ ...prev, policeCalled: true, ngoCalled: true }));
      Alert.alert('Success', 'Police and NGO have been notified');
    } catch (err) {
      setError('Failed to notify authorities: ' + err.message);
      Alert.alert('Error', 'Failed to notify authorities: ' + err.message);
      console.error('Error notifying authorities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save evidence to blockchain
  const saveEvidenceToBlockchain = async () => {
    if (emergencyActions.evidenceSaved) {
      Alert.alert('Already Saved', 'Evidence has already been securely saved');
      return;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you'd get the voice recording from a recorder component
      // For now, we'll just use null to indicate no voice recording available
      await emergencyService.saveEvidenceToBlockchain(null);
      setEmergencyActions(prev => ({ ...prev, evidenceSaved: true }));
      Alert.alert('Success', 'Evidence has been securely saved');
    } catch (err) {
      setError('Failed to save evidence: ' + err.message);
      Alert.alert('Error', 'Failed to save evidence: ' + err.message);
      console.error('Error saving evidence:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop emergency alert
  const stopEmergencyAlert = async () => {
    try {
      setIsLoading(true);
      await emergencyService.stopEmergencyAlert();
      setIsAlertActive(false);
      setSosDuration(0);
      Alert.alert('Alert Stopped', 'Emergency alert has been cancelled');
    } catch (err) {
      setError('Failed to stop emergency alert: ' + err.message);
      Alert.alert('Error', 'Failed to stop emergency alert: ' + err.message);
      console.error('Error stopping emergency alert:', err);
    } finally {
      setIsLoading(false);
    }
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
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Loading Indicator */}
          {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />}

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Emergency SOS Activated!</Text>
            <Text style={styles.subtitle}>
              Your emergency SOS has been activated. Help is on the way.
            </Text>
          </View>

          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <Ionicons name="time" size={24} color="#FF3B30" />
            <Text style={styles.timerText}>SOS Active: {formatTime(sosDuration)}</Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map" size={40} color="#CCCCCC" />
              <Text style={styles.mapPlaceholderText}>Live Location Map</Text>
              {locationData ? (
                <Text style={styles.mapPlaceholderSubtext}>
                  Latitude: {locationData.latitude.toFixed(6)}, 
                  Longitude: {locationData.longitude.toFixed(6)}
                  {locationData.accuracy && ` (±${locationData.accuracy.toFixed(1)}m)`}
                </Text>
              ) : (
                <Text style={styles.mapPlaceholderSubtext}>
                  Waiting for location data...
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.actionButton,
                emergencyActions.locationSent && styles.actionButtonCompleted
              ]}
              onPress={sendLocationToGuardians}
              disabled={isLoading || emergencyActions.locationSent}
            >
              <Ionicons 
                name="location" 
                size={24} 
                color="#FFFFFF" 
              />
              <Text style={styles.actionButtonText}>
                {emergencyActions.locationSent ? 'Location Sent ✓' : 'Send Live Location to Guardians'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.emergencyButton,
                (emergencyActions.policeCalled && emergencyActions.ngoCalled) && styles.actionButtonCompleted
              ]}
              onPress={callPoliceAndNGO}
              disabled={isLoading || (emergencyActions.policeCalled && emergencyActions.ngoCalled)}
            >
              <Ionicons 
                name="call" 
                size={24} 
                color="#FFFFFF" 
              />
              <Text style={styles.actionButtonText}>
                {(emergencyActions.policeCalled && emergencyActions.ngoCalled) ? 
                  'Authorities Notified ✓' : 'Call Police & NGO'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.blockchainButton,
                emergencyActions.evidenceSaved && styles.actionButtonCompleted
              ]}
              onPress={saveEvidenceToBlockchain}
              disabled={isLoading || emergencyActions.evidenceSaved}
            >
              <Ionicons 
                name="lock-closed" 
                size={24} 
                color="#FFFFFF" 
              />
              <Text style={styles.actionButtonText}>
                {emergencyActions.evidenceSaved ? 'Evidence Saved ✓' : 'Save Voice & Location to Blockchain'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Guardian Alert Section */}
          <View style={styles.guardianAlert}>
            <View style={styles.alertHeader}>
              <Ionicons name="notifications" size={24} color="#FF3B30" />
              <Text style={styles.alertTitle}>Guardians have been notified</Text>
            </View>
            <View style={styles.alertStatus}>
              <Ionicons 
                name="notifications" 
                size={20} 
                color={isAlertActive ? '#4CAF50' : '#FF3B30'} 
              />
              <Text style={styles.alertStatusText}>
                {isAlertActive ? 'Alert Active' : 'Alert Stopped'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.stopAlertButton}
              onPress={stopEmergencyAlert}
              disabled={isLoading}>
              <Text style={styles.stopAlertButtonText}>Stop Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencySOSScreen; 