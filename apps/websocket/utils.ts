export function getRequestUrl(payloadUrl: string, videoId: string | null = null) {
    let video_id;
    console.log(videoId);
    const api_token = process.env.YOUTUBE_API_KEY;
    if (!videoId) {
        const video_url = payloadUrl;
        if (video_url.split("//")[1].startsWith("www.youtube.com")) {
            const params = new URL(video_url!);
            video_id = params.searchParams.get('v')!;
        }
        else video_id = video_url.split("youtu.be/")[1].split("?")[0];
    }
    else video_id = videoId;
    return `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&key=${api_token}&part=snippet,contentDetails,statistics`
}

export function getSongDuration(rawDuration: string) {
    let duration = 0;
    let addTime = 0;
    for (let i = 1; i < rawDuration.length; i++) {
        if (isNaN(Number(rawDuration[i]))) {
            console.log(addTime, rawDuration[i]);
            if (rawDuration[i] == 'D') duration += (24 * 60 * 60) * addTime;
            else if (rawDuration[i] == 'H') duration += (60 * 60) * addTime;
            else if (rawDuration[i] == 'M') duration += 60 * addTime;
            else if (rawDuration[i] == 'S') duration += addTime;
            addTime = 0;
        }
        else {
            addTime = addTime * 10 + Number(rawDuration[i]);
        }
    }
    console.log(duration);
    return duration;
}