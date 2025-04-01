import { WebSocket } from "ws";
import { RoomManager } from "./Managers/RoomManager";
import { WsMessage } from "comman/message";
import { getRequestUrl } from "./utils";

interface Message {
    type: string;
    payload: {
        roomId?: string;
        url?: string;
        adminId?: string;
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
            if (message.type == "createRoom") {
                const roomId = message.payload.roomId!;
                RoomManager.getInstance().createRoom(roomId, this.userId);
            }
            else if (message.type == "joinRoom") {
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
                const reqUrl = getRequestUrl(message.payload.url!);
                if (!reqUrl) return;
                const res = await fetch(reqUrl);
                const data = await res.json();
                console.log(data.items[0].snippet);
                console.log(data.items[0].contentDetails);
                console.log(data.items[0].statistics);
            }
        }
    }
}