import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Text, 
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/LiveLocationStatusScreenStyles';

// Import location service
import locationService from '../../services/locationService';

const LiveLocationStatusScreen = () => {
  const navigation = useNavigation();
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for location data
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    address: null,
    lastUpdated: null,
    accuracy: null,
    speed: null,
    heading: null
  });
  
  // State for tracking settings
  const [trackingSettings, setTrackingSettings] = useState({
    isActive: false,
    updateInterval: 5, // seconds
    shareWithGuardians: true,
    shareWithAuthorities: false
  });

  // Fetch location tracking status on component mount
  useEffect(() => {
    const fetchLocationStatus = async () => {
      try {
        setIsLoading(true);
        const status = await locationService.getLocationTrackingStatus();
        setIsLocationActive(status.isTracking);
      } catch (err) {
        setError('Failed to load location tracking status');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocationStatus();
  }, []);

  // Start location tracking when isLocationActive changes
  useEffect(() => {
    let locationSubscription;
    
    const startLocationTracking = async () => {
      try {
        if (isLocationActive) {
          setIsLoading(true);
          // Start location tracking
          locationSubscription = await locationService.startLocationTracking({
            timeInterval: trackingSettings.updateInterval * 1000,
            distanceInterval: 10,
          });
          
          // Set up listener for location updates
          locationService.onLocationUpdate((data) => {
            setLocationData({
              ...data,
              lastUpdated: new Date().toISOString()
            });
          });
          
          // Get initial location immediately
          const initialLocation = await locationService.getCurrentLocation();
          setLocationData({
            ...initialLocation,
            lastUpdated: new Date().toISOString()
          });
          
          setIsLoading(false);
        } else if (locationSubscription) {
          // Stop tracking if it becomes inactive
          await locationService.stopLocationTracking();
        }
      } catch (err) {
        setError('Failed to start location tracking');
        console.error(err);
        setIsLoading(false);
      }
    };
    
    startLocationTracking();
    
    return () => {
      // Clean up subscription when component unmounts
      if (locationSubscription) {
        locationService.stopLocationTracking().catch(err => 
          console.error('Error stopping location tracking:', err)
        );
      }
    };
  }, [isLocationActive, trackingSettings.updateInterval]);

  // Toggle location tracking
  const toggleLocationTracking = async () => {
    try {
      setIsLoading(true);
      if (isLocationActive) {
        await locationService.stopLocationTracking();
        setIsLocationActive(false);
      } else {
        await locationService.requestPermissions();
        setIsLocationActive(true);
      }
    } catch (err) {
      setError(`Failed to ${isLocationActive ? 'stop' : 'start'} location tracking: ${err.message}`);
      Alert.alert(
        'Location Error', 
        `Failed to ${isLocationActive ? 'stop' : 'start'} location tracking: ${err.message}`
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format time for display
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Not yet updated';
    
    try {
      const now = new Date();
      const updated = new Date(timestamp);
      const diffInSeconds = Math.floor((now - updated) / 1000);
      
      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      } else {
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
      }
    } catch (e) {
      console.error('Error formatting time:', e);
      return 'Unknown time';
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

      {/* Content */}
      <View style={styles.content}>
        {/* Loading Indicator */}
        {/* TODO: Add loading indicator when API calls are in progress */}
        {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />} */}

        {/* Error Message */}
        {/* TODO: Add error message display */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}

        <View style={styles.locationStatusCard}>
          {/* Status Header */}
          <View style={styles.statusHeader}>
            <Ionicons name="location" size={24} color="#FF3B30" />
            <Text style={styles.statusTitle}>Live Location Active</Text>
          </View>

          {/* Status Content */}
          <View style={styles.statusContent}>
            <Text style={styles.statusText}>
              SafeMitra is securely tracking your location in real time while background monitoring is ON.
            </Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            {/* This would be replaced with an actual map component in production */}
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map" size={40} color="#CCCCCC" />
              <Text style={styles.mapPlaceholderText}>User's Live Map View</Text>
              {locationData.latitude && locationData.longitude ? (
                <Text style={styles.mapPlaceholderSubtext}>
                  Latitude: {locationData.latitude.toFixed(6)}, 
                  Longitude: {locationData.longitude.toFixed(6)}
                </Text>
              ) : (
                <Text style={styles.mapPlaceholderSubtext}>
                  Waiting for location data...
                </Text>
              )}
            </View>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusIndicator}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isLocationActive ? '#4CAF50' : '#FF3B30' }
            ]} />
            <Text style={styles.statusIndicatorText}>
              {isLocationActive ? 'Location Tracking Active' : 'Location Tracking Inactive'}
            </Text>
            
            {/* Loading Indicator */}
            {isLoading ? (
              <ActivityIndicator size="small" color="#FF3B30" style={{marginVertical: 10}} />
            ) : (
              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={toggleLocationTracking}
              >
                <Text style={styles.toggleButtonText}>
                  {isLocationActive ? 'Pause Tracking' : 'Resume Tracking'}
                </Text>
              </TouchableOpacity>
            )}
            
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>
          
          {/* Location Details */}
          {locationData.latitude && locationData.longitude && (
            <View style={styles.locationDetails}>
              <Text style={styles.locationDetailsTitle}>Location Details</Text>
              <Text style={styles.locationDetailsText}>
                Latitude: {locationData.latitude.toFixed(6)}
              </Text>
              <Text style={styles.locationDetailsText}>
                Longitude: {locationData.longitude.toFixed(6)}
              </Text>
              {locationData.accuracy && (
                <Text style={styles.locationDetailsText}>
                  Accuracy: {locationData.accuracy.toFixed(2)} meters
                </Text>
              )}
              {locationData.speed && (
                <Text style={styles.locationDetailsText}>
                  Speed: {(locationData.speed * 3.6).toFixed(2)} km/h
                </Text>
              )}
              <Text style={styles.locationDetailsText}>
                Last Updated: {formatLastUpdated(locationData.lastUpdated)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LiveLocationStatusScreen;