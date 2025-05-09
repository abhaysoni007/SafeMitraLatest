import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';

// TODO: Import API service for registration
// import { authService } from '../../services/authService';

const MobileRegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for registration status
  // const [registrationStatus, setRegistrationStatus] = useState({
  //   isRegistered: false,
  //   userId: null,
  //   token: null
  // });

  // Create refs for OTP inputs
  const otpInputs = useRef([...Array(6)].map(() => React.createRef()));

  const handleMobileNumberChange = (text) => {
    // Remove any non-digit characters
    const cleanNumber = text.replace(/[^0-9]/g, '');
    
    // Only take first 10 digits
    const truncatedNumber = cleanNumber.slice(0, 10);
    
    setMobileNumber(truncatedNumber);
  };

  // TODO: Update handleSendOtp to use API
  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit mobile number');
      return;
    }
    
    // TODO: Implement API call to send OTP
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   // Call API to send OTP
    //   await authService.sendOtp(mobileNumber);
    //   
    //   // Show success message
    //   Alert.alert(
    //     'OTP Sent',
    //     'A verification code has been sent to your mobile number.',
    //     [{ text: 'OK' }]
    //   );
    //   
    //   setIsOtpSent(true);
    // } catch (err) {
    //   setError('Failed to send OTP. Please try again.');
    //   Alert.alert('Error', 'Failed to send OTP. Please try again.');
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Temporary success for development
    setIsOtpSent(true);
  };

  // TODO: Update handleOtpChange to use API
  const handleOtpChange = (value, index) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input or verify OTP if all filled
    if (value !== '') {
      if (index < 5) {
        // Focus next input
        otpInputs.current[index + 1].focus();
      } else if (index === 5) {
        // Verify OTP
        const otpValue = newOtp.join('');
        if (otpValue.length === 6) {
          // TODO: Implement API call to verify OTP
          // verifyOtp(otpValue);
          
          // Temporary verification for development
          setIsOtpVerified(true);
        }
      }
    }
  };

  // TODO: Add function to verify OTP with API
  // const verifyOtp = async (otpValue) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     
  //     // Call API to verify OTP
  //     const response = await authService.verifyOtp(mobileNumber, otpValue);
  //     
  //     if (response.data.isVerified) {
  //       setIsOtpVerified(true);
  //     } else {
  //       Alert.alert('Invalid OTP', 'The verification code you entered is incorrect.');
  //     }
  //   } catch (err) {
  //     setError('Failed to verify OTP. Please try again.');
  //     Alert.alert('Error', 'Failed to verify OTP. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleOtpKeyPress = (event, index) => {
    // Handle backspace
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      otpInputs.current[index - 1].focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  // TODO: Update handleRegister to use API
  const handleRegister = async () => {
    if (!isOtpVerified) {
      Alert.alert('Verification Required', 'Please verify your mobile number first');
      return;
    }
    if (!fullName || !pin || !confirmPin) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('PIN Mismatch', 'PINs do not match');
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Terms Not Accepted', 'Please accept the Terms of Use and Privacy Policy');
      return;
    }

    // TODO: Implement API call to register user
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   // Call API to register user
    //   const response = await authService.register({
    //     fullName,
    //     mobileNumber,
    //     pin,
    //     acceptedTerms
    //   });
    //   
    //   // Store registration data
    //   setRegistrationStatus({
    //     isRegistered: true,
    //     userId: response.data.userId,
    //     token: response.data.token
    //   });
    //   
    //   // Store authentication token
    //   await authService.storeToken(response.data.token);
    //   
    //   // Navigate to voice training
    //   navigation.navigate('VoiceTraining');
    // } catch (err) {
    //   setError('Registration failed. Please try again.');
    //   Alert.alert('Registration Failed', err.response?.data?.message || 'Registration failed. Please try again.');
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Temporary navigation for development
    navigation.navigate('VoiceTraining');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Splash')}
          >
            <Ionicons name="arrow-back" size={24} color="#d32f2f" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#d32f2f" size={30} />
            <Text style={styles.logoText}>SafeMitra</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Register with Mobile Number</Text>
          <Text style={styles.subtitle}>Enter basic details to get started</Text>

          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}

          {/* Mobile Number Input with Verification */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileInputContainer}>
              <TextInput
                style={[styles.input, styles.mobileInput]}
                placeholder="Enter 10 digit mobile number"
                keyboardType="number-pad"
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                editable={!isOtpVerified}
                maxLength={10}
              />
              {isOtpVerified && (
                <View style={styles.verifiedIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
              )}
            </View>
            {!isOtpSent && mobileNumber.length === 10 && (
              <TouchableOpacity
                style={[
                  styles.sendOtpButton,
                ]}
                onPress={handleSendOtp}
              >
                <Text style={styles.sendOtpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* OTP Input */}
          {isOtpSent && !isOtpVerified && (
            <View style={styles.otpContainer}>
              <Text style={styles.label}>Enter OTP</Text>
              <View style={styles.otpInputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(event) => handleOtpKeyPress(event, index)}
                  />
                ))}
              </View>
              {/* Resend OTP Link */}
              {/* TODO: Add resend OTP functionality */}
              {/* <TouchableOpacity 
                style={styles.resendOtpButton}
                onPress={handleSendOtp}
                disabled={isLoading}
              >
                <Text style={styles.resendOtpText}>Resend OTP</Text>
              </TouchableOpacity> */}
            </View>
          )}

          {/* Rest of the form - only shown after OTP verification */}
          {isOtpVerified && (
            <>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Riya Sharma"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* Create PIN Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Create PIN</Text>
                <View style={styles.pinInput}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="****"
                    secureTextEntry={!showPin}
                    value={pin}
                    onChangeText={setPin}
                    maxLength={4}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPin(!showPin)}
                  >
                    <Ionicons
                      name={showPin ? 'eye-off' : 'eye'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm PIN Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm PIN</Text>
                <View style={styles.pinInput}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="****"
                    secureTextEntry={!showConfirmPin}
                    value={confirmPin}
                    onChangeText={setConfirmPin}
                    maxLength={4}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPin(!showConfirmPin)}
                  >
                    <Ionicons
                      name={showConfirmPin ? 'eye-off' : 'eye'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                >
                  <Ionicons
                    name={acceptedTerms ? 'checkbox' : 'square-outline'}
                    size={24}
                    color="#d32f2f"
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text> &{' '}
                  <Text style={styles.termsLink}>Terms of Use</Text>
                </Text>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                ]}
                onPress={handleRegister}
              >
                <>
                  <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
                  <Text style={styles.registerButtonText}>Register Securely</Text>
                </>
              </TouchableOpacity>

              {/* Encryption Notice */}
              <View style={styles.encryptedContainer}>
                <Ionicons name="lock-closed" size={16} color="#999" />
                <Text style={styles.encryptedText}>
                  Your information is end-to-end encrypted
                </Text>
              </View>
            </>
          )}

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  headerRight: {
    width: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d32f2f',
    marginLeft: 8,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileInput: {
    flex: 1,
    marginRight: 10,
  },
  verifiedIcon: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  sendOtpButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  sendOtpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  pinInput: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  termsLink: {
    color: '#d32f2f',
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  encryptedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  encryptedText: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  // TODO: Add styles for error message
  // errorText: {
  //   color: '#d32f2f',
  //   fontSize: 14,
  //   marginBottom: 16,
  //   textAlign: 'center',
  // },
  // TODO: Add styles for resend OTP button
  // resendOtpButton: {
  //   marginTop: 8,
  //   alignItems: 'center',
  // },
  // resendOtpText: {
  //   color: '#d32f2f',
  //   fontSize: 14,
  //   textDecorationLine: 'underline',
  // },
};

export default MobileRegistrationScreen; 







