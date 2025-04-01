import { create } from "zustand"

interface webSocketInstance {
    ws : WebSocket | null,
    setWs : (socket : WebSocket) => void;
}

export const useWs = create<webSocketInstance>((set) => ({
    ws: null,
    setWs: (socket: WebSocket) => { 
        set({ ws: socket })
    }
}))
