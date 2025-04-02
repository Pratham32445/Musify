import type { User } from "./User";
import { WsMessage } from "comman/message"
import type { CurrentPlayingSong, Song } from "comman/shared-types"


export class Room {
    roomId: string;
    adminId: string;
    subscribers: User[];
    playBackQueue: Song[];
    isRoomActive: boolean;
    isPlaying: boolean;
    currentPlayingSong: Song | null;
    currentSongSeek: number;

    constructor(roomId: string, adminId: string) {
        this.roomId = roomId;
        this.adminId = adminId;
        this.subscribers = [];
        this.playBackQueue = [];
        this.isRoomActive = true;
        this.isPlaying = false;
        this.currentPlayingSong = null;
        this.currentSongSeek = 0;
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
        if (this.playBackQueue.length == 1 && this.currentPlayingSong == null) {
            setTimeout(() => {
                this.playSong();
            }, 2000)
        }
    }
    upvote(songId: string, userId: string) {
        const song = this.playBackQueue.find((song) => song.id == songId);
        if (song && !song.upvotes.has(userId)) {
            song.upvotes.add(userId);
            song.upvotesLength = song.upvotes.size;
            console.log(this.playBackQueue);
            this.sendUpdate({ type: WsMessage.QueueUpdate, payload: { Queue: this.playBackQueue } })
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
    playSong() {
        this.currentPlayingSong = this.playBackQueue[0];
        this.playBackQueue.shift();
        const payload: CurrentPlayingSong = {
            ...this.currentPlayingSong,
            currentSeek: this.currentSongSeek
        }
        this.sendUpdate({
            type: WsMessage.currentSong, payload
        })

        this.sendUpdate({ type: WsMessage.QueueUpdate, payload: { Queue: this.playBackQueue } })

        let interval = setInterval(() => {
            this.currentSongSeek++;
            if (this.currentSongSeek > this.currentPlayingSong!.duration!) {
                clearInterval(interval);
                if (this.playBackQueue.length > 0) this.playSong();
            }
        }, 1000);
    }
}