/* eslint-disable */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');

// Read .env file manually
const envPath = path.resolve(__dirname, '../.env');
let env = {};
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim();
            env[key] = val;
        }
    });
}

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'https://matha-excursionary-veraciously.ngrok-free.dev/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Error: Please ensure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are in your .env file.');
    process.exit(1);
}

const scopes = 'user-read-currently-playing user-read-playback-state';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;

console.log('\n=== Spotify Refresh Token Generator ===\n');
console.log('1. Go to your Spotify Developer Dashboard for your app.');
console.log(`2. Ensure "${REDIRECT_URI}" is added to "Redirect URIs" in settings.`);
console.log('3. Open this URL in your browser to authorize:');
console.log('\n' + authUrl + '\n');
console.log('4. After authorizing, you will be redirected to a URL like "http://localhost:5173/callback?code=..."');
console.log('   (It might show a 404 page, that is fine. We just need the code from the address bar.)');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('5. Paste the "code" parameter from the URL here: ', (code) => {
    // Basic formatting if they pasted the whole URL
    if (code.includes('code=')) {
        code = code.split('code=')[1].split('&')[0];
    }

    // Exchange for token
    const postData = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
    }).toString();

    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.refresh_token) {
                    console.log('\nSUCCESS! Here is your refresh token:');
                    console.log('\n' + json.refresh_token + '\n');
                    console.log('Add this to your .env file as: SPOTIFY_REFRESH_TOKEN=' + json.refresh_token);
                } else {
                    console.error('\nError getting token:', json);
                }
            } catch (e) {
                console.error('Error parsing response:', e);
            }
            rl.close();
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
        rl.close();
    });

    req.write(postData);
    req.end();
});
