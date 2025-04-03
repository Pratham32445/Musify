import { Room } from "../Room";

export class RoomManager {
    rooms: Map<string, Room>;
    static instance: RoomManager;
    constructor() {
        this.rooms = new Map();
    }
    static getInstance() {
        if (RoomManager.instance) return RoomManager.instance;
        RoomManager.instance = new RoomManager();
        return RoomManager.instance;
    }
    createRoom(roomId: string, adminId: string) {
        const newRoom = new Room(roomId, adminId);
        this.rooms.set(roomId, newRoom);
        console.log(this.rooms);
    }
    deleteRoom(roomId : string) {
        if(this.rooms.has(roomId)) this.rooms.delete(roomId);
    }
    getRoom(roomId: string) {
        if (this.rooms.has(roomId)) return this.rooms.get(roomId);
        return null;
    }   
}