import type { User } from "./User";

interface Song {
    Id: string;
    link: string;
    upvotes: number;
}

export class Room {
    roomId: string;
    adminId: string;
    subscribers: User[];
    playBackQueue: Song[]
    constructor(roomId: string, adminId: string) {
        this.roomId = roomId;
        this.adminId = adminId;
        this.subscribers = [];
        this.playBackQueue = [];
    }
    addUser(user: User) {
        this.subscribers.push(user);
    }
    removeUser(user: User) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber.userId != user.userId);
    }
    addSong(songInfo : Song) {
        this.playBackQueue.push(songInfo);
    }
}