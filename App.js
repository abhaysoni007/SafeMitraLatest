import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioRecorder from './components/AudioRecorder';
import SplashScreen from './screen/functional-part/SplashScreens';
import MobileRegistrationScreen from './screen/functional-part/MobileRegistrationScreen';
import LoginScreen from './screen/functional-part/LoginScreen';
import VoiceTrainingScreen from './screen/functional-part/VoiceTrainingScreen';
import AddGuardianScreen from './screen/functional-part/AddGuardianScreen';
import LowBatteryConfigScreen from './screen/functional-part/LowBatteryConfigScreen';
import SecretCodeSetupScreen from './screen/functional-part/SecretCodeSetupScreen';
import SafeMitraReadyScreen from './screen/functional-part/SafeMitraReadyScreen';
import DashboardScreen from './screen/functional-part/DashboardScreen';
import LiveLocationStatusScreen from './screen/functional-part/LiveLocationStatusScreen';
import HotwordDetectionScreen from './screen/functional-part/HotwordDetectionScreen';
import EmergencySOSScreen from './screen/functional-part/EmergencySOSScreen';
import AutoAlertActiveScreen from './screen/functional-part/AutoAlertActiveScreen';
import EvidenceSecureScreen from './screen/functional-part/EvidenceSecureScreen';
import GuardianAlertSentScreen from './screen/functional-part/GuardianAlertSentScreen';
import EmergencyEvidenceScreen from './screen/functional-part/EmergencyEvidenceScreen';
import GuardianAlertReceivedScreen from './screen/functional-part/GuardianAlertReceivedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('App component rendered');
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' }
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MobileRegistration" component={MobileRegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VoiceTraining" component={VoiceTrainingScreen} />
        <Stack.Screen name="AddGuardian" component={AddGuardianScreen} />
        <Stack.Screen name="LowBatteryConfig" component={LowBatteryConfigScreen} />
        <Stack.Screen name="SecretCodeSetup" component={SecretCodeSetupScreen} />
        <Stack.Screen name="SafeMitraReady" component={SafeMitraReadyScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen 
          name="LiveLocationStatus" 
          component={LiveLocationStatusScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="HotwordDetection" 
          component={HotwordDetectionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="EmergencySOS" 
          component={EmergencySOSScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="AutoAlertActive" 
          component={AutoAlertActiveScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="EvidenceSecure" 
          component={EvidenceSecureScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="EmergencyEvidence" 
          component={EmergencyEvidenceScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="GuardianAlertSent" 
          component={GuardianAlertSentScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="GuardianAlert" 
          component={GuardianAlertReceivedScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
      <AudioRecorder />
    </NavigationContainer>
  );
} 