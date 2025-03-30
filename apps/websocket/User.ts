import { WebSocket } from "ws";
import { RoomManager } from "./Managers/RoomManager";

interface Message {
    type: string;
    payload: {}
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
            const roomId = "abc";
            if (message.type == "createRoom") {
                RoomManager.getInstance().createRoom(roomId, this.userId);
            }
            else if (message.type == "addUser") {
                const room = RoomManager.getInstance().getRoom(roomId)
                if(room) room.addUser(this);
            }
        }
    }
}