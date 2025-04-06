
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
    isPlaying: boolean;
    createdAt?: Date;
}

export interface CurrentPlayingSong extends Song {
    currentSeek: number;
    serverTimeStamp: number;
}

export interface Room {
    Id: string;
    Name: string;
    adminId: string;
    thumbnail: string;
    isPrivate: boolean;
    subscribers: any;
    subadmins: String[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    userId: string;
    message: string;
    userName: string;
    time: Date;
}