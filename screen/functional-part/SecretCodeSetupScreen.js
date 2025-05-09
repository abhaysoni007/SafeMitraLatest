import React, { useState, useRef } from 'react';
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
import { styles } from '../styles-part/SecretCodeSetupScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';

// TODO: Import API service for secret code setup
// import { securityService } from '../../services/securityService';

const SecretCodeSetupScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [confirmCode, setConfirmCode] = useState(['', '', '', '', '', '']);
  const [hint, setHint] = useState('');
  const [activeInput, setActiveInput] = useState(0);
  const codeInputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const confirmCodeInputRefs = useRef([...Array(6)].map(() => React.createRef()));
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);

  const handleCodeChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '') {
      if (index < 5) {
        setActiveInput(index + 1);
        codeInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleConfirmCodeChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newConfirmCode = [...confirmCode];
    newConfirmCode[index] = value;
    setConfirmCode(newConfirmCode);

    if (value !== '') {
      if (index < 5) {
        confirmCodeInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleCodeKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
      setActiveInput(index - 1);
      codeInputRefs.current[index - 1].focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const handleConfirmCodeKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !confirmCode[index]) {
      confirmCodeInputRefs.current[index - 1].focus();
      const newConfirmCode = [...confirmCode];
      newConfirmCode[index - 1] = '';
      setConfirmCode(newConfirmCode);
    }
  };

  const isCodeValid = () => {
    const codeString = code.join('');
    const confirmCodeString = confirmCode.join('');
    return codeString.length === 6 && confirmCodeString.length === 6 && codeString === confirmCodeString;
  };

  // TODO: Update handleSaveCode to use API
  const handleSaveCode = async () => {
    if (!isCodeValid()) {
      Alert.alert('Invalid Code', 'Please enter matching 6-digit codes');
      return;
    }

    // TODO: Implement API call to save secret code
    // try {
    //   setIsLoading(true);
    //   setError(null);
    //   
    //   const codeString = code.join('');
    //   
    //   // Call API to save secret code
    //   await securityService.saveSecretCode({
    //     code: codeString,
    //     hint: hint
    //   });
    //   
    //   // Show success message
    //   Alert.alert(
    //     'Code Saved',
    //     'Your secret code has been securely saved.',
    //     [{ text: 'OK' }]
    //   );
    //   
    //   // Navigate to SafeMitraReady screen
    //   navigation.navigate('SafeMitraReady');
    // } catch (err) {
    //   setError('Failed to save secret code. Please try again.');
    //   Alert.alert('Error', 'Failed to save secret code. Please try again.');
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Temporary navigation for development
    navigation.navigate('SafeMitraReady');
  };

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
            <Ionicons name="arrow-back" size={24} color="#FF3B30" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#FF3B30" size={30} />
            <Text style={styles.logoText}>SafeMitra</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Secret Code Setup</Text>
          <Text style={styles.subtitle}>
            This code helps you securely access your emergency data later.
          </Text>

          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}

          <View style={styles.pinContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={`code-${index}`}
                ref={el => codeInputRefs.current[index] = el}
                style={[
                  styles.pinInput,
                  activeInput === index && styles.activePinInput
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={(event) => handleCodeKeyPress(event, index)}
                onFocus={() => setActiveInput(index)}
                secureTextEntry
                editable={!false} // TODO: Disable during API calls
              />
            ))}
          </View>

          <Text style={styles.subtitle}>Confirm your code</Text>

          <View style={styles.pinContainer}>
            {confirmCode.map((digit, index) => (
              <TextInput
                key={`confirm-${index}`}
                ref={el => confirmCodeInputRefs.current[index] = el}
                style={styles.pinInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleConfirmCodeChange(value, index)}
                onKeyPress={(event) => handleConfirmCodeKeyPress(event, index)}
                secureTextEntry
                editable={!false} // TODO: Disable during API calls
              />
            ))}
          </View>

          <View style={styles.hintContainer}>
            <Text style={styles.hintLabel}>Hint (Optional)</Text>
            <TextInput
              style={styles.hintInput}
              placeholder="e.g. pet's name or favorite color"
              placeholderTextColor="#999"
              value={hint}
              onChangeText={setHint}
              editable={!false} // TODO: Disable during API calls
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="shield-checkmark" size={20} color="#FF3B30" />
            <Text style={styles.infoText}>
              Only you can unlock your emergency evidence using this code. No one else can access it without your permission.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              { opacity: isCodeValid() ? 1 : 0.7 }
            ]}
            onPress={handleSaveCode}
            disabled={!isCodeValid() || false} // TODO: Disable during API calls
          >
            {false ? ( // TODO: Show loading indicator during API calls
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Text style={styles.continueButtonText}>Save Secret Code</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.securityTips}>
            Keep this code private. If you forget it, you won't be able to access your saved emergency data.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SecretCodeSetupScreen; 