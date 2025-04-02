import { create } from "zustand"
import { Song } from "comman/shared-types"

interface webSocketInstance {
    ws: WebSocket | null,
    setWs: (socket: WebSocket) => void;
}

interface selectedRoomId {
    roomId: string | null;
    setRoomId: (roomId: string) => void;
}

interface SongQueue {
    queue: Song[],
    setNewSong : (song : Song) => void;
    setQueue: (queue : Song[]) => void;
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

export const useQueue = create<SongQueue>((set) => ({
    queue: [],
    setNewSong: (song: Song) => {
        set((prev) => ({
            queue: [...prev.queue, song]
        }))
    },
    setQueue : (queue : Song[]) => {
        set({queue})
    }
}))