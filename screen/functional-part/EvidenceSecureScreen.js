import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/EvidenceSecureScreenStyles';

/**
 * EvidenceSecureScreen
 * 
 * This screen handles:
 * 1. Displaying the secure status of evidence
 * 2. Providing access to emergency data and logs
 * 3. Managing secure code validation
 * 
 * Backend Integration Points:
 * 1. Secret Code Validation:
 *    - Create an API endpoint for validating the secret code
 *    - Endpoint should be: POST /api/security/validate-code
 *    - Request body: { code: string }
 *    - Response: { isValid: boolean, message?: string }
 * 
 * 2. Emergency Data Access:
 *    - Create an API endpoint for fetching emergency data
 *    - Endpoint should be: GET /api/emergency/data
 *    - Headers: Include authentication token
 *    - Response: { data: EmergencyData, timestamp: string }
 * 
 * 3. Access Logs:
 *    - Create an API endpoint for fetching access logs
 *    - Endpoint should be: GET /api/access-logs
 *    - Headers: Include authentication token
 *    - Response: { logs: AccessLog[] }
 */
const EvidenceSecureScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

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

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Animated.View 
            style={[
              styles.shieldIconContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}>
            <Ionicons name="shield-checkmark" size={40} color="#FF3B30" />
          </Animated.View>
          <Text style={styles.title}>Your Data is Locked</Text>
          <Text style={styles.subtitle}>
            Your voice and location evidence has been encrypted and stored using blockchain technology. Only trusted guardians can access it using your secret code.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#4CAF50"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>Status: Evidence Encrypted</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="lock-closed"
              size={24}
              color="#FF3B30"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>Access: Locked</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="cube"
              size={24}
              color="#FF3B30"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>Storage: Blockchain Confirmed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.blockchainInfo}
          onPress={() => setIsExpanded(!isExpanded)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.blockchainTitle}>What is Blockchain?</Text>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color="#666666"
            />
          </View>
          {isExpanded && (
            <Text style={styles.blockchainText}>
              Blockchain is a secure, decentralized technology that ensures your data cannot be altered or deleted. Each piece of evidence is stored across multiple secure locations, making it tamper-proof and permanently accessible.
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewLogsButton}
          onPress={() => navigation.navigate('EmergencyEvidence')}>
          <Text style={styles.viewLogsButtonText}>View Data Access Logs</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EvidenceSecureScreen; 