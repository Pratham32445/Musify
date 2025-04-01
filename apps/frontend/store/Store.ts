import { create } from "zustand"

interface webSocketInstance {
    ws: WebSocket | null,
    setWs: (socket: WebSocket) => void;
}

interface selectedRoomId {
    roomId: string | null;
    setRoomId: (roomId: string) => void;
}

export const useWs = create<webSocketInstance>((set) => ({
    ws: null,
    setWs: (socket: WebSocket) => {
        set({ ws: socket })
    }
}))

export const UseRoomId = create<selectedRoomId>((set) => ({
    roomId: null,
    setRoomId: (roomId: string) => {
        set({ roomId })
    }
}))
