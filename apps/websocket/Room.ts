import type { User } from "./User";
import { WsMessage } from "comman/message"
import type { CurrentPlayingSong, Message, Song } from "comman/shared-types";
import { updateLastPlayedSong } from "./db";


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
    messages: Message[];

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
        this.messages = [];
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
            type: WsMessage.meJoined,
            payload: {
                success: true
            }
        }))
        user.ws.send(JSON.stringify({
            type: WsMessage.QueueUpdate,
            payload: {
                Queue: this.playBackQueue
            }
        }))
        user.ws.send(JSON.stringify({
            type: WsMessage.initialMessages,
            payload: {
                messages: this.messages
            }
        }))
    }
    removeUser(user: User) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber.userId != user.userId);
        this.sendUpdate({ type: "remove_user", payload: { Id: user.userId } });
    }
    addSong(songInfo: Song) {
        console.log(songInfo);
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
        if (userId == this.adminId) song!.upvotesLength++;
        else if (song && !song.upvotes.has(userId)) {
            song.upvotes.add(userId);
            song.upvotesLength = song.upvotes.size;
        }
        this.playBackQueue.sort((a, b) => b.upvotesLength - a.upvotesLength);
        this.sendUpdate({ type: WsMessage.QueueUpdate, payload: { Queue: this.playBackQueue } })
    }
    seek(userId: string, seekTime: number) {
        if (userId != this.adminId) return;
        this.currentSongSeek = seekTime;
        this.sendUpdate({
            type: WsMessage.seekUpdate,
            payload: {
                currentSeek: this.currentSongSeek,
                timeStamp: Date.now()
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
        this.sendUpdate({
            type: WsMessage.QueueUpdate,
            payload: {
                Queue: this.playBackQueue
            }
        })
        this.startPlayPlayBackInterval();
        updateLastPlayedSong(this.roomId, this.currentPlayingSong)
    }
    startPlayPlayBackInterval() {
        if (this.playBackInterval) {
            clearInterval(this.playBackInterval)
        }
        this.playBackInterval = setInterval(() => {
            this.currentSongSeek++;
            if (this.currentSongSeek % 5 == 0) {
                this.sendUpdate({
                    type: WsMessage.syncUpdate,
                    
                    payload: {
                        currentSeek: this.currentSongSeek,
                        timeStamp: Date.now()
                    }
                })
            }
            if (this.currentPlayingSong && this.currentSongSeek >= this.currentPlayingSong.duration) {
                this.endCurrentSong();
            }
        }, 1000)
    }
    endCurrentSong() {
        if (this.playBackInterval) {
            clearInterval(this.playBackInterval);
            this.playBackInterval = null;
        }
        this.currentPlayingSong = null;
        this.currentSongSeek = 0;
        if (this.playBackQueue.length > 0) {
            this.playSong();
        }
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
    onMessage(message: Message) {
        this.messages.push(message);
        this.sendUpdate({
            type: WsMessage.onMessage,
            payload: {
                message
            }
        })
    }
}