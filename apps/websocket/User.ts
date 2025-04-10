import { WebSocket } from "ws";
import { RoomManager } from "./Managers/RoomManager";
import { WsMessage } from "comman/message";
import { getRequestUrl, getSongDuration } from "./utils";
import type { Song, Message as onMessage } from "comman/shared-types";
import { UserManager } from "./Managers/UserManager";

interface Message {
    type: string;
    payload: {
        roomId?: string;
        url?: string;
        adminId?: string;
        songId?: string;
        userId?: string;
        message?: string;
        userName?: string;
        time?: Date;
        videoId?: string | null;
    }
}

export class User {
    userId: string;
    ws: WebSocket;
    constructor(userId: string, ws: WebSocket) {
        this.userId = userId;
        this.ws = ws;
        this.initHandlers();
    }
    initHandlers() {
        this.ws.onmessage = async (event) => {
            const message: Message = JSON.parse(event.data.toString());
            if (message.type == WsMessage.createRoom) {
                const roomId = message.payload.roomId!;
                RoomManager.getInstance().createRoom(roomId, this.userId);
            }
            else if (message.type == WsMessage.joinRoom) {
                const roomId = message.payload.roomId!;
                let room = RoomManager.getInstance().getRoom(roomId)
                if (!room) {
                    RoomManager.getInstance().createRoom(roomId, message.payload.adminId!);
                    room = RoomManager.getInstance().getRoom(roomId);
                }
                if (!this.userId || !room) return;
                const isUser = room.subscribers.find((subscriber) => subscriber.userId == this.userId);
                if (!isUser) {
                    room.addUser(this);
                }
            }
            else if (message.type == WsMessage.addSong) {
                const roomId = message.payload.roomId;
                const videoId = message.payload.videoId;
                if (videoId) {
                    message.payload.url = `https://www.youtube.com/watch?v=${videoId}`
                }
                const reqUrl = getRequestUrl(message.payload.url!, videoId);
                if (!reqUrl) return;
                const res = await fetch(reqUrl);
                const data = await res.json();
                const duration = getSongDuration(data.items[0].contentDetails.duration);
                const songInfo: Song = {
                    id: data.items[0].id,
                    url: message.payload.url!,
                    title: data.items[0].snippet.title,
                    description: data.items[0].snippet.description,
                    thumbnail: data.items[0].snippet.thumbnails.high.url,
                    duration: duration,
                    views: Number(data.items[0].statistics.viewCount),
                    upvotes: new Set(),
                    upvotesLength: 0,
                    isPlaying: false
                }
                const room = RoomManager.getInstance().getRoom(roomId!)
                room?.addSong(songInfo);
            }
            else if (message.type == WsMessage.upVote) {
                const room = RoomManager.getInstance().getRoom(message.payload.roomId!);
                if (room) {
                    room.upvote(message.payload.songId!, message.payload.userId!)
                }
            }
            else if (message.type == WsMessage.sendMessage) {
                const room = RoomManager.getInstance().getRoom(message.payload.roomId!);
                const userMessage: onMessage = {
                    message: message.payload.message!,
                    userName: message.payload.userName!,
                    time: message.payload.time!,
                    userId: message.payload.userId!
                }
                room?.onMessage(userMessage)
            }
            else if (message.type == WsMessage.disconnectSocket) {
                RoomManager.getInstance().getRoom(message.payload.roomId!)?.removeUser(this);
                UserManager.getInstance().removeUser(this.userId);
                console.log(UserManager.getInstance().users,"users");
            }
        }
    }
}