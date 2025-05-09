import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';

// TODO: Import API service for guardian operations
// import { guardianService } from '../../services/guardianService';

const GuardianAlertSentScreen = () => {
  const navigation = useNavigation();
  const [pulseAnim] = useState(new Animated.Value(1));
  
  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);
  
  // TODO: Add state for tracking alert status
  // const [alertStatus, setAlertStatus] = useState({
  //   isActive: true,
  //   startTime: new Date(),
  //   endTime: null
  // });
  
  // Initial state for guardians (will be replaced with API data)
  const [guardians, setGuardians] = useState([
    { id: 1, name: 'John Doe', phone: '+91 98765 43210', status: 'Pending' },
    { id: 2, name: 'Jane Smith', phone: '+91 98765 43211', status: 'Viewed' },
    { id: 3, name: 'Mike Johnson', phone: '+91 98765 43212', status: 'Responded' },
  ]);

  // TODO: Add useEffect to fetch guardian alert status
  // useEffect(() => {
  //   const fetchGuardianAlertStatus = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await guardianService.getGuardianAlertStatus();
  //       setGuardians(response.data.guardians);
  //       setAlertStatus(response.data.alertStatus);
  //     } catch (err) {
  //       setError('Failed to load guardian alert status');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   
  //   fetchGuardianAlertStatus();
  //   
  //   // Set up polling to check for updates
  //   const pollingInterval = setInterval(fetchGuardianAlertStatus, 10000); // Poll every 10 seconds
  //   
  //   return () => clearInterval(pollingInterval);
  // }, []);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
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
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Viewed':
        return '👁️';
      case 'Responded':
        return '✅';
      default:
        return '';
    }
  };

  const getStatusCount = () => {
    const viewed = guardians.filter(g => g.status === 'Viewed').length;
    const responded = guardians.filter(g => g.status === 'Responded').length;
    return { viewed, responded };
  };

  // TODO: Add function to manually stop the alert
  // const stopAlert = async () => {
  //   try {
  //     setIsLoading(true);
  //     await guardianService.stopGuardianAlert();
  //     setAlertStatus(prev => ({ ...prev, isActive: false, endTime: new Date() }));
  //     Alert.alert('Success', 'Guardian alert stopped successfully');
  //     navigation.goBack();
  //   } catch (err) {
  //     setError('Failed to stop guardian alert');
  //     Alert.alert('Error', 'Failed to stop guardian alert');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const { viewed, responded } = getStatusCount();

  // TEMPORARY: Function to simulate guardian receiving alert
  // TODO: Remove this function when implementing actual notification system
  const handleTestGuardianAlert = () => {
    navigation.navigate('GuardianAlert', {
      victimName: 'Test User',
      location: 'Test Location',
      whatsappNumber: '+91 98765 43210'
    });
  };

  const handleNotificationPress = () => {
    // TEMPORARY: Navigate to GuardianAlertReceived screen
    // TODO: Replace with actual notification handling when implementing backend
    navigation.navigate('GuardianAlert', {
      victimName: 'Victim',
      location: 'Test Location',
      whatsappNumber: '+91 98765 43210'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header wrapped in SafeAreaView to avoid overlap with system UI */}
      <SafeAreaView style={{
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}>
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
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Loading Indicator */}
          {/* TODO: Add loading indicator when API calls are in progress */}
          {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" style={styles.loadingIndicator} />} */}

          {/* Error Message */}
          {/* TODO: Add error message display */}
          {/* {error && <Text style={styles.errorText}>{error}</Text> */}

          {/* Alert Icon */}
          <TouchableOpacity onPress={handleNotificationPress}>
            <Animated.View style={[styles.alertIconContainer, { transform: [{ scale: pulseAnim }] }]}>
              <Ionicons name="notifications" size={60} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Your Guardians Have Been Alerted</Text>

          {/* Description */}
          <Text style={styles.description}>
            All listed guardians have received your SOS alert along with your live location. 
            The alert will vibrate continuously on their devices until one of them responds.
          </Text>

          {/* Status Card */}
          <View style={styles.statusCard}>
            {guardians.map((guardian, index) => (
              <View key={guardian.id}>
                <View style={styles.guardianItem}>
                  <View style={styles.guardianInfo}>
                    <Text style={styles.guardianName}>{guardian.name}</Text>
                    <Text style={styles.guardianPhone}>{guardian.phone}</Text>
                  </View>
                  <Text style={styles.statusText}>
                    {getStatusIcon(guardian.status)} {guardian.status}
                  </Text>
                </View>
                {index < guardians.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

          {/* Response Tracker */}
          <View style={styles.trackerContainer}>
            <Text style={styles.trackerTitle}>Response Status</Text>
            <View style={styles.trackerStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{viewed}</Text>
                <Text style={styles.statLabel}>Viewed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{responded}</Text>
                <Text style={styles.statLabel}>Responded</Text>
              </View>
            </View>
          </View>

          {/* Notification Text */}
          <Text style={styles.notificationText}>
            You'll be notified once any guardian stops the alert
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width: `${(responded / guardians.length) * 100}%` }
              ]} 
            />
          </View>
          
          {/* Stop Alert Button */}
          {/* TODO: Add stop alert button */}
          {/* <TouchableOpacity 
            style={styles.stopButton}
            onPress={stopAlert}
          >
            <Text style={styles.stopButtonText}>Stop Alert</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginLeft: 10,
  },
  rightPlaceholder: {
    width: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  alertIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  statusCard: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  guardianItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  guardianInfo: {
    flex: 1,
  },
  guardianName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 4,
  },
  guardianPhone: {
    fontSize: 14,
    color: '#666666',
  },
  statusText: {
    fontSize: 14,
    color: '#666666',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },
  trackerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  // TODO: Add styles for loading indicator and error message
  // loadingIndicator: {
  //   marginVertical: 20,
  // },
  // errorText: {
  //   color: '#FF3B30',
  //   marginVertical: 10,
  //   textAlign: 'center',
  // },
  // stopButton: {
  //   backgroundColor: '#FF3B30',
  //   paddingVertical: 12,
  //   paddingHorizontal: 30,
  //   borderRadius: 8,
  //   marginTop: 20,
  // },
  // stopButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  trackerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 15,
    textAlign: 'center',
  },
  trackerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  notificationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF3B30',
    borderRadius: 2,
  },
  notificationIcon: {
    padding: 5,
  },
});

export default GuardianAlertSentScreen; 