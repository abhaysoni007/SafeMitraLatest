import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/ProfileScreenStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const profileOptions = [
    {
      title: 'Edit Profile',
      icon: 'create-outline',
      onPress: () => console.log('Edit Profile pressed'),
    },
    {
      title: 'Change PIN',
      icon: 'key-outline',
      onPress: () => console.log('Change PIN pressed'),
    },
    {
      title: 'Manage Guardians',
      icon: 'people-outline',
      onPress: () => navigation.navigate('AddGuardian'),
    },
    {
      title: 'Emergency Contacts',
      icon: 'call-outline',
      onPress: () => console.log('Emergency Contacts pressed'),
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
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={60} color="#FF3B30" />
            </View>
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.userPhone}>+91 9876543210</Text>
          </View>

          {/* Profile Options */}
          {profileOptions.map((option, index) => (
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

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Splash')}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 