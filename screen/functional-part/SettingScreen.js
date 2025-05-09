import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/SettingScreenStyles';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => console.log('Notifications pressed'),
    },
    {
      title: 'Privacy',
      icon: 'lock-closed-outline',
      onPress: () => console.log('Privacy pressed'),
    },
    {
      title: 'Language',
      icon: 'language-outline',
      onPress: () => console.log('Language pressed'),
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => console.log('About pressed'),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => console.log('Help pressed'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>

          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <View style={styles.optionContent}>
                <Ionicons name={option.icon} size={24} color="#333" />
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;