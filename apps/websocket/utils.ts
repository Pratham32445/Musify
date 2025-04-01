export function getRequestUrl(payloadUrl: string) {
    const api_token = process.env.YOUTUBE_API_KEY;
    const video_url = payloadUrl;
    const params = new URL(video_url!);
    const videoId = params.searchParams.get('v')!;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${api_token}&part=snippet,contentDetails,statistics`
    return url;
}