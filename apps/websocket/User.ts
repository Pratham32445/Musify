import { WebSocket } from "ws";
import { RoomManager } from "./Managers/RoomManager";

interface Message {
    type: string;
    payload: {
        roomId?: string;
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
        this.ws.onmessage = (event) => {
            const message: Message = JSON.parse(event.data.toString());
            const roomId = message.payload.roomId!;
            if (message.type == "createRoom") {
                RoomManager.getInstance().createRoom(roomId, this.userId);
            }
            else if (message.type == "joinRoom") {
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
        }
    }
}