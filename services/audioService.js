const sendAudioToBackend = async (audioUri) => {
  try {
    console.log('Starting audio upload...');
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    });

    // Your actual device IP addresses (from ipconfig)
    const hosts = [
      // Your actual computer's IP addresses
      'http://192.168.19.108:5001',   // Your main IP address
      'http://192.168.206.1:5001',    // Your secondary IP address
      'http://192.168.179.1:5001',    // Your VMware IP address
      // Fallback options
      'http://10.0.2.2:5001',     // Android emulator
      'http://localhost:5001',    // Direct localhost
      'http://127.0.0.1:5001',    // Alternative localhost
    ];

    let workingHost = null;
    
    // First check which host is reachable using the health endpoint
    for (const host of hosts) {
      try {
        console.log(`Checking health at: ${host}/health`);
        const healthResponse = await fetch(`${host}/health`, { 
          method: 'GET',
          timeout: 2000 
        });
        
        if (healthResponse.ok) {
          console.log(`Found working backend at: ${host}`);
          workingHost = host;
          break;
        }
      } catch (error) {
        console.log(`Health check failed for ${host}: ${error.message}`);
      }
    }
    
    if (!workingHost) {
      throw new Error('No reachable backend server found');
    }
    
    // Now send the audio to the working host
    console.log(`Uploading audio to ${workingHost}/upload-audio`);
    const response = await fetch(`${workingHost}/upload-audio`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error sending audio to backend:', error);
    throw error;
  }
};

export { sendAudioToBackend }; 