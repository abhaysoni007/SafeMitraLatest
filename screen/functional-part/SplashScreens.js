import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from '../styles-part/SplashScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';

// TODO: Import API service for authentication check
// import { authService } from '../../services/authService';

const SplashScreen = ({ navigation }) => {
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(true);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for authentication status
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Add useEffect to check authentication status on component mount
  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);
  
  // TODO: Implement function to check authentication status
  // const checkAuthStatus = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     // Call API to check if user is already authenticated
  //     const response = await authService.checkAuthStatus();
  //     
  //     if (response.data.isAuthenticated) {
  //       // User is already logged in, navigate to Dashboard
  //       navigation.replace('Dashboard');
  //     } else {
  //       // User is not logged in, show splash screen
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     setError('Failed to check authentication status. Please try again.');
  //     console.error(err);
  //     setIsLoading(false);
  //   }
  // };

  const handleGetStarted = () => {
    navigation.navigate('MobileRegistration');
  };

  return (
    <View style={styles.container}>
      {/* Error Message */}
      {/* TODO: Add error message display */}
      {/* {error && <Text style={styles.errorText}>{error}</Text> */}
      
      {/* Loading Indicator */}
      {/* TODO: Add loading indicator */}
      {/* {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )} */}
      
      <View style={styles.contentContainer}>
        <SafeMitraLogo color="#FFFFFF" size={150} />
        <Text style={styles.title}>Safety First</Text>
        <Text style={styles.subtitle}>Your Safety, Our Priority</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
        activeOpacity={0.8}
        disabled={false} // TODO: Disable during API calls
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen; 