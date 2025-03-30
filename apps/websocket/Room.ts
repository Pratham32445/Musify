import type { User } from "./User";

interface Song {
    Id: string;
    link: string;
    upvotes: string[];
    duration: number;
}

export class Room {
    roomId: string;
    adminId: string;
    subscribers: User[];
    playBackQueue: Song[];
    isRoomActive: boolean;
    isPlaying: boolean;

    constructor(roomId: string, adminId: string) {
        this.roomId = roomId;
        this.adminId = adminId;
        this.subscribers = [];
        this.playBackQueue = [];
        this.isRoomActive = true;
        this.isPlaying = true;
    }
    addUser(user: User) {
        this.subscribers.push(user);
        this.sendUpdate({ type: "new_user", payload: { user } })
    }
    removeUser(user: User) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber.userId != user.userId);
        this.sendUpdate({ type: "remove_user", payload: { Id: user.userId } });
    }
    addSong(songInfo: Song) {
        this.playBackQueue.push(songInfo);
    }
    pause(adminId: string) {
        if (this.adminId != adminId) return;
        this.isPlaying = true;
    }
    checkRoomStatus() {
        setInterval(() => {
            if (this.subscribers.length == 0) this.isRoomActive = false;
        }, 2000)
    }
    sendUpdate(payload: any) {
        this.subscribers.forEach((subscriber) => {
            subscriber.ws.send(payload);
        })
    }
}