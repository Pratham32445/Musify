export function formattedDuration(duration: number) {
    const hours = Math.floor(duration / 3600);
    duration = duration - hours * 3600;
    const minutes = Math.floor(duration / 60);
    duration = duration - minutes * 60;
    const seconds = duration;
    let durationStr = "";
    if (hours) durationStr += hours < 10 ? `0${hours}:` : `${hours}:`
    if (minutes) durationStr += minutes < 10 ? `0${minutes}:` : `${minutes}:`
    if (seconds) durationStr += seconds < 10 ? `0${seconds}` : `${seconds}`
    return durationStr[durationStr.length - 1] == ':' ? durationStr.slice(0, -1) : durationStr;
}

export function viewsFormatter(views : number) {
    const million = 1000000;
    const thousand = 1000;
    if(views >= million) return `${Math.floor(views/million)}M`;
    else if(views >= thousand) return `${Math.floor(views/thousand)}K`;
    return views;
}