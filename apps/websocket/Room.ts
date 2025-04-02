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
    playBackInterval: NodeJS.Timeout | null;
    currentSongSeek: number;
    lastSeekUpdateTime: number;

    constructor(roomId: string, adminId: string) {
        this.roomId = roomId;
        this.adminId = adminId;
        this.subscribers = [];
        this.playBackQueue = [];
        this.isRoomActive = true;
        this.isPlaying = false;
        this.currentPlayingSong = null;
        this.playBackInterval = null;
        this.currentSongSeek = 0;
        this.lastSeekUpdateTime = Date.now();
    }

    addUser(user: User) {
        this.subscribers.push(user);
        this.sendUpdate({ type: WsMessage.newUserJoined, payload: { user } })
        if (this.currentPlayingSong) {
            const payload = {
                ...this.currentPlayingSong,
                isPlaying: this.currentPlayingSong,
            }
            user.ws.send(JSON.stringify({
                type: WsMessage.currentSong,
                payload
            }))
        }
        user.ws.send(JSON.stringify({
            type: WsMessage.QueueUpdate,
            payload: {
                Queue: this.playBackQueue
            }
        }))
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
            this.playBackQueue.sort((a, b) => b.upvotesLength - a.upvotesLength);
            this.sendUpdate({ type: WsMessage.QueueUpdate, payload: { Queue: this.playBackQueue } })
        }
    }
    seek(userId: string, seekTime: number) {
        if (userId != this.adminId) return;
        this.currentSongSeek = seekTime;
        this.sendUpdate({
            type: WsMessage.seekUpdate,
            payload: {
                currentSeek: this.currentSongSeek
            }
        })
    }
    playSong() {
        if (this.playBackQueue.length == 0) return;
        this.currentPlayingSong = this.playBackQueue[0];
        this.playBackQueue.shift();
        this.currentSongSeek = 0;
        this.isPlaying = true;
        const payload: CurrentPlayingSong = {
            ...this.currentPlayingSong,
            currentSeek: this.currentSongSeek,
            isPlaying: true,
            serverTimeStamp: Date.now()
        }
        this.sendUpdate({
            type: WsMessage.currentSong,
            payload
        })
        this.startPlayPlayBackInterval();
    }
    startPlayPlayBackInterval() {
        
    }
    checkRoomStatus() {
        setInterval(() => {
            if (this.subscribers.length == 0) {
                this.isRoomActive = false;

            }
        }, 10000);
    }
    sendUpdate(message: any) {
        this.subscribers.forEach((subscriber) => {
            subscriber.ws.send(JSON.stringify(message));
        })
    }
}