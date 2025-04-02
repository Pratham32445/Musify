export interface Song {
    id: string;
    url: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    views: number;
    upvotes: Set<string>;
    upvotesLength: number;
    isPlaying : boolean;
}

export interface CurrentPlayingSong extends Song {
    currentSeek: number;
    serverTimeStamp : number;
}