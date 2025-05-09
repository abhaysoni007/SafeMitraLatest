import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { styles } from '../styles-part/LoginScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';

// TODO: Import API service for authentication
// import { authService } from '../../services/authService';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const pinInputRefs = useRef([...Array(4)].map(() => React.createRef()));
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for authentication status
  // const [authStatus, setAuthStatus] = useState({
  //   isAuthenticated: false,
  //   token: null,
  //   user: null
  // });

  // TODO: Add useEffect to check if user is already logged in
  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const token = await authService.getStoredToken();
  //       if (token) {
  //         // Verify token validity
  //         const isValid = await authService.verifyToken(token);
  //         if (isValid) {
  //           // Token is valid, navigate to dashboard
  //           navigation.replace('Dashboard');
  //         } else {
  //           // Token is invalid, clear it
  //           await authService.clearStoredToken();
  //         }
  //       }
  //     } catch (err) {
  //       console.error('Error checking auth status:', err);
  //     }
  //   };
  //   
  //   checkAuthStatus();
  // }, []);

  const handleMobileNumberChange = (text) => {
    // Remove any non-digit characters
    const cleanNumber = text.replace(/[^0-9]/g, '');
    
    // Only take first 10 digits
    const truncatedNumber = cleanNumber.slice(0, 10);
    
    setMobileNumber(truncatedNumber);
  };

  const handlePinChange = (value, index) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value !== '') {
      if (index < 3) {
        pinInputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePinKeyPress = (event, index) => {
    // Handle backspace
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !pin[index]) {
      pinInputRefs.current[index - 1].focus();
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
    }
  };

  // TODO: Update handleLogin to use API authentication
  const handleLogin = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (pin.join('').length !== 4) {
      Alert.alert('Invalid Input', 'Please enter complete PIN');
      return;
    }

    // TODO: Implement API authentication
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   // Call authentication API
    //   const response = await authService.login({
    //     mobileNumber,
    //     pin: pin.join('')
    //   });
    //   
    //   // Store authentication token
    //   await authService.storeToken(response.data.token);
    //   
    //   // Update auth status
    //   setAuthStatus({
    //     isAuthenticated: true,
    //     token: response.data.token,
    //     user: response.data.user
    //   });
    //   
    //   // Navigate to appropriate screen based on user status
    //   if (response.data.user.isNewUser) {
    //     navigation.replace('VoiceTraining');
    //   } else {
    //     navigation.replace('Dashboard');
    //   }
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Login failed. Please try again.');
    //   Alert.alert('Login Failed', err.response?.data?.message || 'Login failed. Please try again.');
    //   console.error('Login error:', err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Temporary navigation for development
    navigation.navigate('Dashboard');
  };

  // TODO: Add function to handle forgot PIN
  // const handleForgotPin = async () => {
  //   if (!mobileNumber || mobileNumber.length !== 10) {
  //     Alert.alert('Invalid Input', 'Please enter a valid 10-digit mobile number');
  //     return;
  //   }
  //   
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     // Call forgot PIN API
  //     await authService.requestPinReset(mobileNumber);
  //     
  //     // Navigate to OTP verification screen
  //     navigation.navigate('OTPVerification', { 
  //       mobileNumber,
  //       purpose: 'pin_reset'
  //     });
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to request PIN reset');
  //     Alert.alert('Error', err.response?.data?.message || 'Failed to request PIN reset');
  //     console.error('Forgot PIN error:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#d32f2f" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#d32f2f" size={30} />
            <Text style={styles.logoText}>SafeMitra</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Secure Login</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number and PIN
          </Text>

          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter 10 digit mobile number"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                maxLength={10}
                // TODO: Update to disable during API calls: editable={!isLoading}
              />
              <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter PIN</Text>
            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={el => pinInputRefs.current[index] = el}
                  style={styles.pinInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handlePinChange(value, index)}
                  onKeyPress={(event) => handlePinKeyPress(event, index)}
                  secureTextEntry
                  // TODO: Update to disable during API calls: editable={!isLoading}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              // TODO: Update to show loading state: { opacity: mobileNumber.length === 10 && pin.join('').length === 4 && !isLoading ? 1 : 0.7 }
              { opacity: mobileNumber.length === 10 && pin.join('').length === 4 ? 1 : 0.7 }
            ]}
            onPress={handleLogin}
            // TODO: Update to disable during API calls: disabled={mobileNumber.length !== 10 || pin.join('').length !== 4 || isLoading}
            disabled={mobileNumber.length !== 10 || pin.join('').length !== 4}
          >
            {/* TODO: Show loading indicator during API calls */}
            {/* {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : ( */}
              <>
                <Text style={styles.verifyText}>
                  Verify & Login
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </>
            {/* )} */}
          </TouchableOpacity>

          {/* Forgot PIN Link */}
          {/* TODO: Add forgot PIN link */}
          {/* <TouchableOpacity 
            style={styles.forgotPinButton}
            onPress={handleForgotPin}
            disabled={isLoading}
          >
            <Text style={styles.forgotPinText}>Forgot PIN?</Text>
          </TouchableOpacity> */}

          <View style={styles.securityContainer}>
            <Ionicons name="shield-checkmark" size={16} color="#999" />
            <Text style={styles.securityText}>
              Your login is encrypted and secure
            </Text>
          </View>

          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen; 