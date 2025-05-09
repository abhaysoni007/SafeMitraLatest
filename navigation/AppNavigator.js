import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screen/functional-part/SplashScreens';
import MobileRegistrationScreen from '../screen/functional-part/MobileRegistrationScreen';
import LowBatteryConfigScreen from '../screen/functional-part/LowBatteryConfigScreen';
import SecretCodeSetupScreen from '../screen/functional-part/SecretCodeSetupScreen';
import GuardianAlertReceivedScreen from '../screen/functional-part/GuardianAlertReceivedScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
        <Stack.Screen name="LowBatteryConfig" component={LowBatteryConfigScreen} />
        <Stack.Screen name="SecretCodeSetup" component={SecretCodeSetupScreen} />
        <Stack.Screen name="GuardianAlert" component={GuardianAlertReceivedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 