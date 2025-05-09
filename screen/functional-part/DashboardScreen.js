import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/DashboardScreenStyles';

// TODO: Import API service for dashboard operations
// import { dashboardService } from '../../services/dashboardService';

const DashboardScreen = () => {
  const navigation = useNavigation();
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for user status and last update time
  // const [userStatus, setUserStatus] = useState({
  //   isSafe: true,
  //   lastUpdated: new Date(),
  //   locationTracking: true,
  //   hotwordDetection: true,
  //   emergencySOS: false,
  //   autoAlert: false
  // });

  // TODO: Add useEffect to fetch dashboard data
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await dashboardService.getDashboardData();
  //       setUserStatus(response.data);
  //     } catch (err) {
  //       setError('Failed to load dashboard data');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   
  //   fetchDashboardData();
  //   
  //   // Set up periodic refresh
  //   const refreshInterval = setInterval(fetchDashboardData, 60000); // Refresh every minute
  //   
  //   return () => clearInterval(refreshInterval);
  // }, []);

  // TODO: Add function to format last updated time
  // const formatLastUpdated = (date) => {
  //   const now = new Date();
  //   const diffInSeconds = Math.floor((now - date) / 1000);
  //   
  //   if (diffInSeconds < 60) {
  //     return `${diffInSeconds} seconds ago`;
  //   } else if (diffInSeconds < 3600) {
  //     return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  //   } else if (diffInSeconds < 86400) {
  //     return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  //   } else {
  //     return `${Math.floor(diffInSeconds / 86400)} days ago`;
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <SafeMitraLogo color="#FF3B30" size={30} />
          <Text style={styles.logoText}>SafeMitra</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Loading Indicator */}
          {/* TODO: Add loading indicator when API calls are in progress */}
          {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />} */}

          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}

          {/* Status Banner */}
          <View style={styles.statusBanner}>
            <Text style={styles.statusTitle}>
              {/* TODO: Replace with dynamic status from API */}
              You are Safe
            </Text>
            <Text style={styles.statusSubtitle}>
              {/* TODO: Replace with dynamic last updated time from API */}
              Last updated 2 minutes ago
            </Text>
          </View>

          {/* Status Shield */}
          <View style={styles.shieldContainer}>
            <View style={styles.shield}>
              <Ionicons name="shield" size={60} color="#FF3B30" />
            </View>
            <Text style={styles.shieldTitle}>SafeMitra is watching over you</Text>
            <Text style={styles.shieldSubtitle}>
              {/* TODO: Replace with dynamic location tracking status from API */}
              Your current location is being monitored
            </Text>
          </View>

          {/* Card Grid */}
          <View style={styles.cardGrid}>
            {/* Live Location Card */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('LiveLocationStatus')}
            >
              <Ionicons name="location" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Live Location</Text>
            </TouchableOpacity>

            {/* Hotword Detection Card */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('HotwordDetection')}
            >
              <Ionicons name="mic" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Hotword Detection</Text>
            </TouchableOpacity>

            {/* Emergency SOS Card */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('EmergencySOS')}
            >
              <Ionicons name="alert-circle" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Emergency SOS</Text>
            </TouchableOpacity>

            {/* Auto Alert Card */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('AutoAlertActive')}
            >
              <Ionicons name="people" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Auto Alert</Text>
            </TouchableOpacity>

            {/* Secure Voice & Location Card */}
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('EvidenceSecure')}
            >
              <Ionicons name="lock-closed" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Secure Data</Text>
            </TouchableOpacity>

            {/* Guardian Alert Card */}
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('GuardianAlertSent')}
            >
              <Ionicons name="notifications" size={32} color="#FFFFFF" />
              <Text style={styles.cardText}>Guardian Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerIcon}
          onPress={() => navigation.navigate('Splash')}
        >
          <Ionicons name="home" size={24} color="#FF3B30" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="settings" size={24} color="#666666" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="person" size={24} color="#666666" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;