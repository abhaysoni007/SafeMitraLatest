const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

// Enable CORS for all routes with specific headers
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Timestamp']
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `audio-${timestamp}.m4a`);
  }
});

const upload = multer({ storage: storage });

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Home page
app.get('/', (req, res) => {
  // Read files from the uploads directory
  let fileList = [];
  if (fs.existsSync(uploadsDir)) {
    try {
      fileList = fs.readdirSync(uploadsDir)
        .filter(file => file.endsWith('.m4a'))
        .map(file => {
          const stats = fs.statSync(path.join(uploadsDir, file));
          return {
            name: file,
            size: (stats.size / 1024).toFixed(2) + ' KB',
            created: new Date(stats.birthtime).toLocaleString()
          };
        });
    } catch (err) {
      console.error('Error reading uploads directory:', err);
    }
  }

  res.send(`
    <html>
      <head>
        <title>SafeMitra Audio Backend</title>
        <meta http-equiv="refresh" content="10">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            line-height: 1.5;
          }
          .success { color: green; }
          .error { color: red; }
          .endpoint { 
            background: #f0f0f0; 
            padding: 10px; 
            border-radius: 4px; 
            margin: 10px 0; 
          }
          pre { 
            background: #f8f8f8; 
            padding: 10px; 
            border-radius: 4px; 
            overflow: auto; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
          }
          th, td { 
            text-align: left; 
            padding: 12px 8px; 
            border-bottom: 1px solid #ddd; 
          }
          th { 
            background-color: #f2f2f2; 
            position: sticky;
            top: 0;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          .file-list { margin-top: 20px; }
          .no-files { color: #666; font-style: italic; }
          .download-btn, .play-btn {
            display: inline-block;
            margin-right: 5px;
            padding: 5px 10px;
            border-radius: 4px;
            text-decoration: none;
            cursor: pointer;
            border: none;
            font-size: 14px;
          }
          .download-btn {
            background-color: #4CAF50;
            color: white;
          }
          .play-btn {
            background-color: #2196F3;
            color: white;
          }
          #player-container {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          #now-playing {
            margin-bottom: 10px;
            font-weight: bold;
          }
          #audio-player {
            width: 100%;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>SafeMitra Audio Backend</h1>
        <p class="success">✅ Server is running properly!</p>
        
        <h2>Server Information:</h2>
        <pre>
Server URL: http://localhost:${PORT}
Upload endpoint: http://localhost:${PORT}/upload-audio
Health check: http://localhost:${PORT}/health
Files stored in: ${uploadsDir}
Uptime: ${(process.uptime() / 60).toFixed(2)} minutes
        </pre>
        
        <h2>Testing Connection:</h2>
        <p>To test if your app can reach this server, visit:</p>
        <ul>
          <li><a href="/health" target="_blank">Health Check Endpoint</a></li>
        </ul>
        
        <h2>Endpoints:</h2>
        <div class="endpoint">
          <h3>POST /upload-audio</h3>
          <p>Receives audio files from the app and saves them.</p>
          <pre>Content-Type: multipart/form-data
Field name: 'audio'</pre>
        </div>
        
        <h2>Received Files (${fileList.length}):</h2>
        ${fileList.length > 0 
          ? `<table>
              <tr>
                <th>Filename</th>
                <th>Size</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
              ${fileList.map(file => `
                <tr>
                  <td>${file.name}</td>
                  <td>${file.size}</td>
                  <td>${file.created}</td>
                  <td>
                    <a href="/audio/${file.name}" download class="download-btn">Download</a>
                    <button onclick="playAudio('${file.name}')" class="play-btn">Play</button>
                  </td>
                </tr>
              `).join('')}
            </table>
            <div id="player-container" style="margin-top: 20px; display: none;">
              <h3>Audio Player</h3>
              <div id="now-playing"></div>
              <audio id="audio-player" controls style="width: 100%;"></audio>
            </div>
            <script>
              function playAudio(filename) {
                const player = document.getElementById('audio-player');
                const container = document.getElementById('player-container');
                const nowPlaying = document.getElementById('now-playing');
                
                player.src = '/audio/' + filename;
                nowPlaying.textContent = 'Now playing: ' + filename;
                container.style.display = 'block';
                
                player.load();
                player.play().catch(err => {
                  console.error('Error playing audio:', err);
                  alert('Error playing audio: ' + err.message);
                });
              }
            </script>`
          : '<p class="no-files">No audio files received yet. Check that your app is properly connected.</p>'
        }

        <h2>Troubleshooting:</h2>
        <ul>
          <li>Make sure your phone and computer are on the same network</li>
          <li>Try using your computer's IP address instead of localhost</li>
          <li>Check the app console for connection errors</li>
          <li>Verify microphone permissions are granted</li>
        </ul>

        <p><small>Page auto-refreshes every 10 seconds. Last updated: ${new Date().toLocaleString()}</small></p>
      </body>
    </html>
  `);
});

// Upload endpoint
app.post('/upload-audio', upload.single('audio'), (req, res) => {
  if (!req.file) {
    console.log('Error: No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  console.log(`File received: ${req.file.filename}, size: ${req.file.size} bytes`);
  res.json({ 
    success: true,
    message: 'Audio received successfully', 
    filename: req.file.filename,
    size: req.file.size,
    timestamp: new Date().toISOString()
  });
});

// Add a route to serve audio files for playback
app.get('/audio/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Audio file not found' });
  }
  
  // More specific MIME type for M4A files
  res.setHeader('Content-Type', 'audio/mp4');
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  // Send the file directly instead of streaming
  res.sendFile(filePath);
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
==============================================
🎙️ SafeMitra Audio Backend Server Running 🎙️ 
==============================================
Server URL: http://localhost:${PORT}
Upload endpoint: http://localhost:${PORT}/upload-audio
Health check: http://localhost:${PORT}/health
Files stored in: ${uploadsDir}
==============================================
  `);
}); 