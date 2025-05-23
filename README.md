# SafeMitra App

A safety-focused mobile application built with React Native and Expo.

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo Go app installed on your mobile device
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm start
# or
yarn start
```

3. Run on different platforms:
- Web: Press 'w' in the terminal or click the web option in Expo DevTools
- Android: Press 'a' in the terminal or scan the QR code with Expo Go app
- iOS: Press 'i' in the terminal or scan the QR code with Expo Go app (macOS only)

## Project Structure

- `components/` - Reusable React components
- `screen/` - Screen components
  - `functional-part/` - Screen logic and functionality
  - `styles-part/` - Screen-specific styles

## Development

The app is built using:
- Expo SDK 52
- React Native 0.76.9
- React Navigation 6.x
- React Native SVG for icons

## Dummy Backend for Audio Uploads (Development Only)

A simple Express backend is provided for local testing of audio uploads.

### To run the dummy backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies (separate from your main project):
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   # or directly
   node server.js
   ```

The backend will listen on http://localhost:5001 and save uploaded audio files to the 'uploads' folder.

### To use your real backend:
- Just replace the URL in `services/audioService.js` with your actual backend endpoint:
  ```javascript
  // In services/audioService.js
  const response = await fetch('YOUR_REAL_BACKEND_URL/upload-audio', {
    // ...
  });
  ```

## License

MIT #   S a f e M i t r a L a t e s t  
 