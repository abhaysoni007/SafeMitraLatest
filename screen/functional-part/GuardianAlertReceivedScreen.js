import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const GuardianAlertReceivedScreen = () => {
  const [isAlertActive, setIsAlertActive] = useState(true);
  const [bgAnim] = useState(new Animated.Value(0));
  const [iconPulse] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();
  const victimName = 'Victim';

  useEffect(() => {
    // Start vibration
    if (Platform.OS === 'android') {
      Vibration.vibrate([500, 500], true);
    }
    // Start flashing background
    startFlashing();
    // Start pulsing icon
    startIconPulse();
    // Start siren sound
    playSiren();
    return () => {
      stopAlert();
    };
  }, []);

  const startFlashing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
        Animated.timing(bgAnim, { toValue: 0, duration: 400, useNativeDriver: false }),
      ])
    ).start();
  };

  const startIconPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, { toValue: 1.3, duration: 600, useNativeDriver: true }),
        Animated.timing(iconPulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  };

  const playSiren = async () => {
    try {
      const { sound: sirenSound } = await Audio.Sound.createAsync(
        require('../../assets/siren.mp3'),
        { shouldPlay: true, isLooping: true, volume: 1.0 }
      );
      setSound(sirenSound);
    } catch (error) {
      console.log('Error playing siren:', error);
    }
  };

  const stopAlert = async () => {
    Vibration.cancel();
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    setIsAlertActive(false);
  };

  const handleStopAlert = () => {
    stopAlert();
  };

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF0000', '#FFFFFF'],
  });

  if (!isAlertActive) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: '#333', fontWeight: 'bold' }}>Alert Stopped</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>  
      <StatusBar barStyle="light-content" backgroundColor="#FF0000" />
      <View style={styles.content}>
        <Animated.View style={[styles.iconPulse, { transform: [{ scale: iconPulse }] }]}> 
          <Ionicons name="alert" size={80} color="#fff" style={styles.sirenIcon} />
        </Animated.View>
        <Text style={styles.title}>EMERGENCY ALERT</Text>
        <Text style={styles.subtitle}>Emergency alert received from <Text style={{ fontWeight: 'bold', color: '#fff' }}>{victimName}</Text></Text>
        <TouchableOpacity style={styles.stopButton} onPress={handleStopAlert} activeOpacity={0.8}>
          <Text style={styles.stopButtonText}>Stop Alert</Text>
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          <Ionicons name="map" size={40} color="#FF3B30" />
          <Text style={styles.mapText}>Victim's Live Location</Text>
          <Text style={styles.mapSubtext}>[Map Placeholder]</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconPulse: {
    marginBottom: 30,
    backgroundColor: '#FF3B30',
    borderRadius: 60,
    padding: 24,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 30,
    elevation: 10,
  },
  sirenIcon: {
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#FF3B30',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#FF3B30',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  stopButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 60,
    marginBottom: 30,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 10,
  },
  stopButtonText: {
    color: '#FF3B30',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  mapContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginTop: 10,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default GuardianAlertReceivedScreen; 