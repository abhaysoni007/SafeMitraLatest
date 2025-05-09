// services/emergencyService.js

export const emergencyService = {
  initiateEmergency: async () => {
    console.log('Emergency protocol initiated');
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  confirmEmergency: async () => {
    console.log('Emergency confirmed');
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  cancelEmergency: async () => {
    console.log('Emergency canceled');
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
