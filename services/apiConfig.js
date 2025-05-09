// API Configuration for SafeMitra App

const API_BASE_URL = 'https://api.safemitra.com/v1'; // Replace with your actual backend URL

// You can also use localhost for testing
// const API_BASE_URL = 'http://localhost:3000';

const API_ENDPOINTS = {
  // Auth Endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  
  // Location Endpoints
  LOCATION_UPDATE: `${API_BASE_URL}/location/update`,
  LOCATION_HISTORY: `${API_BASE_URL}/location/history`,
  LOCATION_SETTINGS: `${API_BASE_URL}/location/settings`,
  
  // Emergency Endpoints
  EMERGENCY_SOS: `${API_BASE_URL}/emergency/sos`,
  EMERGENCY_CANCEL: `${API_BASE_URL}/emergency/cancel`,
  EMERGENCY_STATUS: `${API_BASE_URL}/emergency/status`,
  
  // Guardian Endpoints
  GUARDIAN_LIST: `${API_BASE_URL}/guardian/list`,
  GUARDIAN_ADD: `${API_BASE_URL}/guardian/add`,
  GUARDIAN_REMOVE: `${API_BASE_URL}/guardian/remove`,
  
  // Hotword Detection Endpoints
  HOTWORD_SETTINGS: `${API_BASE_URL}/hotword/settings`,
  HOTWORD_STATUS: `${API_BASE_URL}/hotword/status`,
};

export { API_BASE_URL, API_ENDPOINTS };
