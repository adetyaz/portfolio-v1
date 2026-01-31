import { getNowPlaying } from '$lib/server/spotify';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const response = await getNowPlaying();
        console.log(`[Spotify API] Status: ${response.status}`);

        if (response.status === 204) {
            console.log('[Spotify API] No track currently playing (204)');
            return json({ isPlaying: false, debug: '204 / No Content' });
        }

        const text = await response.text();
        console.log('[Spotify API] Raw Body:', text.substring(0, 500)); // Log first 500 chars

        if (response.status > 400) {
            console.error(`[Spotify API] Error Response: ${text}`);
            return json({ isPlaying: false, debug: `Error ${response.status}: ${text.substring(0, 50)}` });
        }

        const song = JSON.parse(text);
        console.log('[Spotify API] Parse Success. Item present:', !!song.item);

        if (song.item === null || !song.item) {
            console.log('[Spotify API] No item found in response - possibly private session or paused.');
            return json({ isPlaying: false, debug: 'No item found', raw: song });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        return json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl
        });
    } catch (e: any) {
        console.error("Spotify API Error:", e);
        return json({ isPlaying: false, debug: `Exception: ${e.message}` });
    }
}
