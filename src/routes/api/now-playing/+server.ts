import { getNowPlaying } from '$lib/server/spotify';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            return json({ isPlaying: false });
        }

        const song = await response.json();

        if (song.item === null) {
            return json({ isPlaying: false });
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
    } catch (error) {
        console.error("Spotify API Error:", error);
        return json({ isPlaying: false });
    }
}
