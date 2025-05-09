// Mock implementation of location service that simulates location updates
// This implementation doesn't require expo-location or other external dependencies
import { API_ENDPOINTS } from './apiConfig';

class LocationService {
  constructor() {
    this.isTracking = false;
    this.locationUpdateInterval = null;
    this.onLocationUpdateCallback = null;
    this.baseLocation = {
      latitude: 19.0760, // Mumbai coordinates as starting point
      longitude: 72.8777,
      accuracy: 15,
      altitude: 14,
      heading: 0,
      speed: 0,
      timestamp: new Date().getTime()
    };
    // Tracking options to simulate real location service config
    this.trackingOptions = {
      timeInterval: 5000, // Update every 5 seconds by default
      distanceInterval: 10 // Update if moved by 10 meters
    };
  }

  // Simulate requesting location permissions
  async requestPermissions() {
    try {
      // In a mock implementation we'll just pretend permissions are granted
      console.log('Mock: Location permissions requested and granted');
      return { foregroundStatus: 'granted', backgroundStatus: 'granted' };
    } catch (error) {
      console.error('Error in mock permission request:', error);
      throw error;
    }
  }

  // Start simulated location tracking
  async startLocationTracking(options = {}) {
    try {
      // Simulate requesting permissions
      await this.requestPermissions();
      
      // Configure tracking options
      const trackingConfig = {
        ...this.trackingOptions,
        ...options,
      };

      // Stop any existing tracking
      if (this.isTracking) {
        await this.stopLocationTracking();
      }

      // Start simulated location updates at the specified interval
      const updateInterval = trackingConfig.timeInterval || 5000;
      this.locationUpdateInterval = setInterval(() => {
        this.simulateLocationUpdate();
      }, updateInterval);

      // Set tracking flag
      this.isTracking = true;
      
      return { remove: () => this.stopLocationTracking() };
    } catch (error) {
      console.error('Error starting mock location tracking:', error);
      throw error;
    }
  }

  // Start simulated background location tracking (for emergency situations)
  async startBackgroundLocationTracking(options = {}) {
    try {
      // This is just a wrapper around startLocationTracking in our mock version
      // In a real implementation, this would use background location services
      await this.startLocationTracking(options);
      console.log('Mock: Background location tracking started');
      return true;
    } catch (error) {
      console.error('Error starting mock background location:', error);
      throw error;
    }
  }

  // Simulate a location update
  simulateLocationUpdate() {
    try {
      // Create small random changes to simulate movement
      const jitter = 0.0002; // Small movement (about 20 meters)
      const locationData = {
        latitude: this.baseLocation.latitude + (Math.random() - 0.5) * jitter,
        longitude: this.baseLocation.longitude + (Math.random() - 0.5) * jitter,
        accuracy: this.baseLocation.accuracy + (Math.random() - 0.5) * 5,
        altitude: this.baseLocation.altitude,
        heading: Math.random() * 360, // Random heading between 0-360 degrees
        speed: Math.random() * 3, // Random speed 0-3 m/s (walking pace)
        timestamp: new Date().getTime(),
      };
      
      // Update the base location for next time to simulate continuous movement
      this.baseLocation = locationData;

      // Simulate sending location to backend
      this.sendLocationToBackend(locationData)
        .catch(error => console.error('Error sending mock location to backend:', error));
      
      // Call the update callback if registered
      if (this.onLocationUpdateCallback) {
        this.onLocationUpdateCallback(locationData);
      }
      
      return locationData;
    } catch (error) {
      console.error('Error simulating location update:', error);
    }
  }

  // Stop simulated tracking
  async stopLocationTracking() {
    try {
      // Clear the update interval
      if (this.locationUpdateInterval) {
        clearInterval(this.locationUpdateInterval);
        this.locationUpdateInterval = null;
      }
      
      this.isTracking = false;
      console.log('Mock: Location tracking stopped');
      return true;
    } catch (error) {
      console.error('Error stopping mock location tracking:', error);
      throw error;
    }
  }

  // Get current simulated location
  async getCurrentLocation() {
    try {
      // Simulate a small delay as would happen with a real GPS request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { ...this.baseLocation, timestamp: new Date().getTime() };
    } catch (error) {
      console.error('Error getting current mock location:', error);
      throw error;
    }
  }

  // Simulate sending location data to backend
  async sendLocationToBackend(locationData) {
    try {
      // Add any additional metadata needed for the backend
      const payload = {
        ...locationData,
        deviceId: await this.getDeviceId(),
        appState: 'foreground',
      };
      
      // In a mock version, we'll just log what would be sent
      console.log('Mock: Sending location to backend:', payload);
      
      // Simulate a successful API response
      return { success: true, message: 'Location update received' };
    } catch (error) {
      console.error('Error in mock location send:', error);
      // Store failed updates for later retry
      this.storeFailedUpdate(locationData);
      throw error;
    }
  }

  // Simulate emergency location tracking with more frequent updates
  async startEmergencyLocationTracking() {
    try {
      // When in emergency, update more frequently
      return await this.startBackgroundLocationTracking({
        timeInterval: 3000, // Update every 3 seconds
        distanceInterval: 5,  // Update if moved by 5 meters
      });
    } catch (error) {
      console.error('Error starting mock emergency tracking:', error);
      throw error;
    }
  }

  // Get a unique device ID for tracking purposes
  async getDeviceId() {
    // Implementation depends on your requirements
    // Could use Expo Device.getDeviceIdAsync() or some stored UUID
    return 'unique-device-id'; // Placeholder
  }

  // Register location update callback
  onLocationUpdate(callback) {
    this.onLocationUpdateCallback = callback;
  }

  // Store failed update for later retry
  storeFailedUpdate(locationData) {
    // Implement storage logic using AsyncStorage or similar
    console.log('Storing failed location update for later retry:', locationData);
  }

  // Retry sending stored failed updates
  async retryFailedUpdates() {
    // Implement retry logic
    console.log('Retrying failed location updates');
  }

  // Get location tracking status
  async getLocationTrackingStatus() {
    try {
      // This could be an API call to get the status from backend
      // or just return the local tracking status
      return {
        isTracking: this.isTracking,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting location tracking status:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const locationService = new LocationService();
export default locationService;

// No background task registration needed for mock implementation
