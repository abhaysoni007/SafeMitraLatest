import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles-part/AddGuardianScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';

// TODO: Import API service for guardian operations
// import { guardianService } from '../../services/guardianService';

const AddGuardianScreen = ({ navigation }) => {
  const [guardians, setGuardians] = useState([
    { id: 1, name: '', phone: '', relation: '' },
    { id: 2, name: '', phone: '', relation: '' },
    { id: 3, name: '', phone: '', relation: '' }
  ]);

  // TODO: Add loading state for API calls
  // const [isLoading, setIsLoading] = useState(false);

  // TODO: Add error state for API error handling
  // const [error, setError] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // TODO: Add useEffect to fetch existing guardians from backend
  // useEffect(() => {
  //   const fetchGuardians = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await guardianService.getGuardians();
  //       if (response.data && response.data.length > 0) {
  //         setGuardians(response.data);
  //       }
  //     } catch (err) {
  //       setError('Failed to load guardians');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   
  //   fetchGuardians();
  // }, []);

  const handleGuardianChange = (id, field, value) => {
    const updatedGuardians = guardians.map(guardian =>
      guardian.id === id ? { ...guardian, [field]: value } : guardian
    );
    setGuardians(updatedGuardians);
  };

  const handlePhoneNumberChange = (id, text) => {
    // Remove any non-digit characters
    const cleanNumber = text.replace(/[^0-9]/g, '');

    // Only take first 10 digits
    const truncatedNumber = cleanNumber.slice(0, 10);

    handleGuardianChange(id, 'phone', truncatedNumber);
  };

  const addGuardian = () => {
    if (guardians.length >= 5) {
      Alert.alert('Maximum Limit', 'You can add up to 5 guardians only.');
      return;
    }
    const newId = Math.max(...guardians.map(g => g.id)) + 1;
    setGuardians([...guardians, { id: newId, name: '', phone: '', relation: '' }]);
  };

  const removeGuardian = (id) => {
    if (guardians.length <= 3) {
      Alert.alert('Cannot Remove', 'You must have at least 3 guardians.');
      return;
    }
    setGuardians(guardians.filter(guardian => guardian.id !== id));
  };

  const validateAndSave = async () => {
    const filledGuardians = guardians.filter(g => g.name && g.phone && g.relation);

    if (filledGuardians.length < 3) {
      Alert.alert('Incomplete Details', 'Please add at least 3 guardians with complete details.');
      return;
    }

    const invalidPhones = guardians.filter(g => g.phone && g.phone.length !== 10);
    if (invalidPhones.length > 0) {
      Alert.alert('Invalid Phone Number', 'Please enter valid 10-digit phone numbers.');
      return;
    }

    // TODO: Add API call to save guardians to backend
    // try {
    //   setIsLoading(true);
    //   await guardianService.saveGuardians(filledGuardians);
    //   
    //   Alert.alert(
    //     'Guardians Added Successfully',
    //     'Your trusted contacts have been saved.',
    //     [
    //       {
    //         text: 'Continue',
    //         onPress: () => navigation.navigate('LowBatteryConfig')
    //       }
    //     ]
    //   );
    // } catch (err) {
    //   setError('Failed to save guardians');
    //   Alert.alert('Error', 'Failed to save guardians. Please try again.');
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Show success modal instead of Alert
    setShowSuccessModal(true);
  };

  const renderGuardianCard = (guardian) => (
    <View key={guardian.id} style={styles.guardianCard}>
      {guardians.length > 1 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeGuardian(guardian.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Anjali Sharma"
          value={guardian.name}
          onChangeText={(text) => {
            if (/^[a-zA-Z ]*$/.test(text)) {
              handleGuardianChange(guardian.id, 'name', text);
            }
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter 10 digit mobile number"
            keyboardType="number-pad"
            value={guardian.phone}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                handlePhoneNumberChange(guardian.id, text);
              }
            }}
            maxLength={10}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Relation</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Sister / Father / Friend"
          value={guardian.relation}
          onChangeText={(text) => {
            if (/^[a-zA-Z ]*$/.test(text)) {
              handleGuardianChange(guardian.id, 'relation', text);
            }
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Guardians Added Success Modal - Remove or update as needed */}
      {showSuccessModal && (
        <View style={styles.trainingFailedOverlay}>
          <View style={styles.trainingFailedBox}>
            {/* Gradient checkmark icon */}
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={36} color="#fff" />
            </View>
            <Text style={styles.trainingFailedTitle}>Guardians Added Successfully</Text>
            <Text style={styles.trainingFailedMessage}>
              Your guardians have been added. They will now receive emergency alerts.
            </Text>
            <TouchableOpacity style={styles.continueAppButton} onPress={() => {
              setShowSuccessModal(false);
              navigation.navigate('SecretCodeSetup');
            }}>
              <Text style={styles.continueAppButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
          <View style={styles.headerRight} />
        </View>

        <Text style={styles.title}>Add Guardian</Text>
        <Text style={styles.subtitle}>
          Trusted people will be notified in emergencies
        </Text>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#FF3B30" />
          <Text style={styles.infoText}>
            You can add up to 5 trusted contacts who will receive your location and alerts during emergencies.
          </Text>
        </View>

        {/* TODO: Add loading indicator when fetching or saving guardians */}
        {/* {isLoading && <ActivityIndicator size="large" color="#FF3B30" />} */}

        {/* TODO: Add error message display */}
        {/* {error && <Text style={styles.errorText}>{error}</Text> */}

        {guardians.map(renderGuardianCard)}

        {guardians.length < 5 && (
          <TouchableOpacity style={styles.addMoreButton} onPress={addGuardian}>
            <Ionicons name="add-circle-outline" size={20} color="#FF3B30" />
            <Text style={styles.addMoreText}>Add More Guardians</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={validateAndSave}
        >
          <Text style={styles.saveButtonText}>Save & Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGuardianScreen;