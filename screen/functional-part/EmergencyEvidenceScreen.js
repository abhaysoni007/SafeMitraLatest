import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/EmergencyEvidenceScreenStyles';

const EmergencyEvidenceScreen = () => {
  const navigation = useNavigation();
  const [secretCode, setSecretCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (secretCode.length < 6) {
      Alert.alert('Invalid Code', 'Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      if (secretCode === '123456') {
        setIsAuthenticated(true);
      } else {
        Alert.alert('Access Denied', 'Incorrect Code. Access Denied.');
        setSecretCode('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to validate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.content}>
        {!isAuthenticated ? (
          <View style={styles.authContainer}>
            <Text style={styles.title}>Enter Secret Code</Text>
            <Text style={styles.subtitle}>
              Please enter your secret code to unlock emergency data.
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                value={secretCode}
                onChangeText={setSecretCode}
                secureTextEntry
                keyboardType="number-pad"
                maxLength={6}
                editable={!isLoading}
              />
            </View>
            <TouchableOpacity
              style={[styles.submitButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Unlock Data</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.evidenceContainer}>
            <Text style={styles.evidenceTitle}>Emergency Evidence Data</Text>
            
            <View style={styles.evidenceList}>
              <View style={styles.evidenceItem}>
                <View style={styles.evidenceHeader}>
                  <Text style={styles.evidenceDate}>March 15, 2024 - 14:30:45</Text>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.evidenceLocation}>
                  <Ionicons name="location" size={16} color="#666666" /> 123 Main Street, City, State 12345
                </Text>
              </View>

              <View style={styles.evidenceItem}>
                <View style={styles.evidenceHeader}>
                  <Text style={styles.evidenceDate}>March 10, 2024 - 09:15:22</Text>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.evidenceLocation}>
                  <Ionicons name="location" size={16} color="#666666" /> 456 Park Avenue, City, State 12345
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download" size={24} color="#FFFFFF" style={styles.downloadIcon} />
              <Text style={styles.downloadButtonText}>Download Evidence</Text>
            </TouchableOpacity>

            <Text style={styles.securityNote}>
              Evidence files are protected and meant for legal purposes only.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyEvidenceScreen; 