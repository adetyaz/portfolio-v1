import { env } from '$env/dynamic/private';

const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Spotify Auth Error: ${JSON.stringify(errorData)}`);
    }

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};
