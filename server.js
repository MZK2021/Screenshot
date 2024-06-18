// import express from 'express';
// import screenshot from 'screenshot-desktop';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const app = express();
// const PORT = 3000;

// // Get the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Route to take a screenshot
// app.get('/screenshot', (req, res) => {
//     screenshot({ format: 'png' }).then((img) => {
//         const screenshotPath = path.join(__dirname, 'screenshot.png');
        
//         // Save the screenshot
//         fs.writeFile(screenshotPath, img, (err) => {
//             if (err) {
//                 console.error('Failed to save screenshot:', err);
//                 res.status(500).send('Failed to take screenshot');
//             } else {
//                 console.log('Screenshot saved as screenshot.png');
//                 res.sendFile(screenshotPath);
//             }
//         });
//     }).catch((err) => {
//         console.error('Failed to take screenshot:', err);
//         res.status(500).send('Failed to take screenshot');
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Access the screenshot at http://localhost:${PORT}/screenshot`);
// });


// const express = require('express');
// const screenshot = require('screenshot-desktop');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Get the directory name of the current module
// const __dirname = path.dirname(require.main.filename);

// // Route to take a screenshot
// app.get('/screenshot', (req, res) => {
//     screenshot({ format: 'png' }).then((img) => {
//         const screenshotPath = path.join(__dirname, 'screenshot.png');
        
//         // Save the screenshot
//         fs.writeFile(screenshotPath, img, (err) => {
//             if (err) {
//                 console.error('Failed to save screenshot:', err);
//                 res.status(500).send('Failed to take screenshot');
//             } else {
//                 console.log('Screenshot saved as screenshot.png');
//                 res.sendFile(screenshotPath);
//             }
//         });
//     }).catch((err) => {
//         console.error('Failed to take screenshot:', err);
//         res.status(500).send('Failed to take screenshot');
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Access the screenshot at http://localhost:${PORT}/screenshot`);
// });


// {
//     "name": "screentest",
//     "version": "1.0.0",
//     "main": "server.js",
//     "bin": "server.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1",
//       "start": "node server.js"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "description": "",
//     "dependencies": {
//       "express": "^4.19.2",
//       "screenshot-desktop": "^1.15.0"
//     }
//   }
  

// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// ----------------------------------------------------------------

// const express = require('express');
// const path = require('path');
// const os = require('os');

// const app = express();
// const PORT = 3000;

// // Function to get local IP address
// function getLocalIpAddress() {
//     const interfaces = os.networkInterfaces();
//     for (const name of Object.keys(interfaces)) {
//         for (const iface of interfaces[name]) {
//             if (iface.family === 'IPv4' && !iface.internal) {
//                 return iface.address;
//             }
//         }
//     }
//     return 'localhost';
// }

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });

// app.listen(PORT, () => {
//     const ipAddress = getLocalIpAddress();
//     console.log(`Server is running on http://${ipAddress}:${PORT}`);
// });


//--------------------------
const express = require('express');
const os = require('os');
const http = require('http');

const app = express();
const PORT = 3000;

// Function to get local IP address
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Function to get public IP address
function getPublicIpAddress(callback) {
    http.get('http://api.ipify.org', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            callback(null, data);
        });
    }).on('error', (err) => {
        callback(err, null);
    });
}

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, '0.0.0.0', () => {
    const localIpAddress = getLocalIpAddress();
    getPublicIpAddress((err, publicIpAddress) => {
        if (err) {
            console.error('Error fetching public IP address:', err);
        } else {
            console.log(`Server is running locally on http://${localIpAddress}:${PORT}`);
            console.log(`Server is accessible publicly on http://${publicIpAddress}:${PORT}`);
        }
    });
});

