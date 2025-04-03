export function getRequestUrl(payloadUrl: string) {
    const api_token = process.env.YOUTUBE_API_KEY;
    const video_url = payloadUrl;
    const params = new URL(video_url!);
    const videoId = params.searchParams.get('v')!;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${api_token}&part=snippet,contentDetails,statistics`
    return url;
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