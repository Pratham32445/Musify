import { WebSocket } from "ws";
import { RoomManager } from "./Managers/RoomManager";
import { WsMessage } from "comman/message";
import { getRequestUrl } from "./utils";
import type { Song } from "comman/shared-types";

interface Message {
    type: string;
    payload: {
        roomId?: string;
        url?: string;
        adminId?: string;
        songId? : string;
        userId? : string;
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
            console.log(message)
            if (message.type == "createRoom") {
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
                const reqUrl = getRequestUrl(message.payload.url!);
                if (!reqUrl) return;
                const res = await fetch(reqUrl);
                const data = await res.json();
                const songInfo: Song = {
                    id: data.items[0].id,
                    title: data.items[0].snippet.title,
                    description: data.items[0].snippet.description,
                    thumbnail: data.items[0].snippet.thumbnails.high.url,
                    duration: 10,
                    views: Number(data.items[0].statistics.viewCount),
                    upvotes: new Set(),
                    upvotesLength : 0
                }
                const room = RoomManager.getInstance().getRoom(roomId!)
                room?.addSong(songInfo);
            }
            else if(message.type == WsMessage.upVote) {
                const room = RoomManager.getInstance().getRoom(message.payload.roomId!);
                if(room) {
                    room.upvote(message.payload.songId!,message.payload.userId!)
                }
            }
        }
    }
}