export async function getVideoId(query: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const resdata = await res.json();
    return resdata.items[0].id.videoId;
}