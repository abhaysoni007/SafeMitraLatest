// Mock emergency service implementation that doesn't depend on external libraries
import { API_ENDPOINTS } from './apiConfig';
import locationService from './locationService';

class EmergencyService {
  constructor() {
    this.isEmergencyActive = false;
    this.emergencyStartTime = null;
    this.sosInterval = null;
    this.locationUpdateInterval = null;
  }

  // Initiate SOS emergency protocol (mock implementation)
  async initiateSOS() {
    try {
      // Start the emergency tracking mode with high frequency location updates
      await locationService.startEmergencyLocationTracking();
      
      // Mark emergency as active
      this.isEmergencyActive = true;
      this.emergencyStartTime = new Date();
      
      // Get initial location
      const initialLocation = await locationService.getCurrentLocation();
      
      // Simulate API call to notify backend about emergency
      console.log('Mock: Initiating SOS emergency with data:', {
        timestamp: new Date().toISOString(),
        location: initialLocation,
        deviceInfo: await this.getDeviceInfo(),
      });
      
      // Set up automatic location updates to backend at regular intervals
      this.setupContinuousLocationUpdates();
      
      return {
        success: true,
        message: 'SOS emergency initiated successfully',
        emergencyId: 'mock-emergency-' + Date.now()
      };
    } catch (error) {
      console.error('Error initiating mock SOS emergency:', error);
      // Even if the mock API call fails, we should still track location locally
      locationService.startEmergencyLocationTracking().catch(err => 
        console.error('Failed to start emergency location tracking:', err)
      );
      throw error;
    }
  }

  // Setup continuous location updates to backend during emergency (mock implementation)
  setupContinuousLocationUpdates() {
    // Clear any existing intervals
    if (this.locationUpdateInterval) {
      clearInterval(this.locationUpdateInterval);
    }
    
    // Set new interval to simulate sending location to backend every 10 seconds
    this.locationUpdateInterval = setInterval(async () => {
      try {
        if (!this.isEmergencyActive) {
          this.clearIntervals();
          return;
        }
        
        // Get current location
        const location = await locationService.getCurrentLocation();
        
        // Simulate sending update to backend
        console.log('Mock: Sending emergency location update to backend:', {
          emergencyMode: true,
          timestamp: new Date().toISOString(),
          location,
          sosActiveDuration: this.getSOSActiveDuration(),
        });
        
      } catch (error) {
        console.error('Error in mock continuous location update:', error);
        // Don't stop the interval on error, keep trying
      }
    }, 10000); // Update every 10 seconds
  }

  // Get device information for emergency reporting
  async getDeviceInfo() {
    // This would typically include device type, OS, app version, etc.
    return {
      deviceId: await locationService.getDeviceId(),
      platform: 'Expo',
      appVersion: '1.0.0',
    };
  }

  // Get duration for which SOS has been active
  getSOSActiveDuration() {
    if (!this.emergencyStartTime) return 0;
    
    const now = new Date();
    const durationMs = now - this.emergencyStartTime;
    return Math.floor(durationMs / 1000); // Return duration in seconds
  }

  // Send location to guardians (mock implementation)
  async sendLocationToGuardians() {
    try {
      const location = await locationService.getCurrentLocation();
      
      // Simulate API call to send location to guardians
      console.log('Mock: Sending location to guardians:', {
        emergencyType: 'sos',
        location,
        message: 'I need help! Here is my current location.',
        timestamp: new Date().toISOString(),
      });
      
      // Simulate a delay to mimic network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        message: 'Location sent to 3 guardians successfully',
        guardiansPinged: ['Guardian 1', 'Guardian 2', 'Guardian 3']
      };
    } catch (error) {
      console.error('Error in mock sendLocationToGuardians:', error);
      throw error;
    }
  }

  // Call police and NGO with current location (mock implementation)
  async callPoliceAndNGO() {
    try {
      const location = await locationService.getCurrentLocation();
      
      // Simulate API call to authorities
      console.log('Mock: Notifying authorities:', {
        notifyPolice: true,
        notifyNGO: true,
        location,
        timestamp: new Date().toISOString(),
      });
      
      // Simulate a delay to mimic network latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Authorities notified successfully',
        policeReferenceNumber: 'POL-' + Math.floor(100000 + Math.random() * 900000),
        ngoReferenceNumber: 'NGO-' + Math.floor(100000 + Math.random() * 900000)
      };
    } catch (error) {
      console.error('Error in mock callPoliceAndNGO:', error);
      throw error;
    }
  }

  // Save voice recording and location as evidence (mock implementation)
  async saveEvidenceToBlockchain(voiceRecording) {
    try {
      const location = await locationService.getCurrentLocation();
      
      // Simulate API call to save evidence
      console.log('Mock: Saving evidence to blockchain:', {
        hasVoiceRecording: voiceRecording !== null,
        location,
        timestamp: new Date().toISOString()
      });
      
      // Simulate a delay to mimic blockchain storage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        message: 'Evidence saved successfully',
        blockchainTransactionId: 'tx-' + Date.now().toString(16),
        evidenceHash: 'hash-' + Math.random().toString(36).substring(2, 15)
      };
    } catch (error) {
      console.error('Error in mock saveEvidenceToBlockchain:', error);
      throw error;
    }
  }

  // Stop emergency alert (mock implementation)
  async stopEmergencyAlert() {
    try {
      // Clear any ongoing intervals
      this.clearIntervals();
      
      // Reset state
      this.isEmergencyActive = false;
      
      // Stop emergency location tracking
      await locationService.stopLocationTracking();
      
      // Simulate notifying backend that emergency is over
      console.log('Mock: Cancelling emergency:', {
        timestamp: new Date().toISOString(),
        emergencyDuration: this.getSOSActiveDuration(),
      });
      
      // Reset emergency start time
      this.emergencyStartTime = null;
      
      return {
        success: true,
        message: 'Emergency alert stopped successfully',
        duration: this.getSOSActiveDuration() + ' seconds'
      };
    } catch (error) {
      console.error('Error in mock stopEmergencyAlert:', error);
      throw error;
    }
  }

  // Clear all intervals
  clearIntervals() {
    if (this.sosInterval) {
      clearInterval(this.sosInterval);
      this.sosInterval = null;
    }
    
    if (this.locationUpdateInterval) {
      clearInterval(this.locationUpdateInterval);
      this.locationUpdateInterval = null;
    }
  }

  // Get current emergency status
  async getEmergencyStatus() {
    try {
      // This could be an API call or just return the local status
      return {
        isActive: this.isEmergencyActive,
        startTime: this.emergencyStartTime,
        duration: this.getSOSActiveDuration(),
      };
    } catch (error) {
      console.error('Error getting emergency status:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const emergencyService = new EmergencyService();
export default emergencyService;
