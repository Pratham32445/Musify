import { create } from "zustand"
import { CurrentPlayingSong, Song } from "comman/shared-types"

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
    setNewSong: (song: Song) => void;
    setQueue: (queue: Song[]) => void;
}

interface ShowChat {
    show: boolean;
    setShowChat: (show: boolean) => void;
}

interface CurrentSong {
    song: CurrentPlayingSong | null;
    setCurrentSong: (song: CurrentPlayingSong) => void;
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
    setQueue: (queue: Song[]) => {
        set({ queue })
    }
}))

export const useShowChat = create<ShowChat>((set) => ({
    show: false,
    setShowChat: (show: boolean) => {
        set({ show })
    }
}))

export const useCurrentSong = create<CurrentSong>((set) => ({
    song: null,
    setCurrentSong: (newSong: CurrentPlayingSong) => {
        set({ song: newSong })
    }
}))