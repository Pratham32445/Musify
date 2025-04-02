import type { User } from "./User";
import { WsMessage } from "comman/message"
import type { Song } from "comman/shared-types"


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
        const message = {
            type: WsMessage.newSongUpdate,
            payload: {
                songInfo
            }
        }
        this.sendUpdate(message);
    }
    upvote(songId: string, userId: string) {
        const song = this.playBackQueue.find((song) => song.id == songId);
        if (song && !song.upvotes.has(userId)) {
            song.upvotes.add(userId);
            song.upvotesLength = song.upvotes.size;
            console.log(this.playBackQueue);
            this.sendUpdate({ type: WsMessage.QueueUpdate, payload: { Queue: this.playBackQueue }})
        }
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
    sendUpdate(message: any) {
        this.subscribers.forEach((subscriber) => {
            subscriber.ws.send(JSON.stringify(message));
        })
    }
}