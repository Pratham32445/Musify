import { create } from "zustand"
import { CurrentPlayingSong, Message, Song } from "comman/shared-types"

interface webSocketInstance {
    ws: WebSocket | null,
    setWs: (socket: WebSocket | null) => void;
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

interface SeekUpdate {
    seek: number,
    updateSeek: (currentSeek: number) => void;
}

interface UserMessages {
    messages: Message[],
    setMessage: (message: Message) => void
    setInitialMessages: (messages: Message[]) => void;
}

interface isSongStarted {
    isStarted: boolean,
    setIsStarted: (isStart: boolean) => void;

}

export const useWs = create<webSocketInstance>((set) => ({
    ws: null,
    setWs: (socket: WebSocket | null) => {
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

export const useSeekUpdate = create<SeekUpdate>((set) => ({
    seek: 0,
    updateSeek: (newSeekTime: number) => {
        set({ seek: newSeekTime })
    }
}))

export const useMessages = create<UserMessages>((set) => ({
    messages: [],
    setMessage: (message: Message) => {
        set((prev) => ({
            messages: [...prev.messages, message]
        }))
    },
    setInitialMessages: (messages: Message[]) => {
        set({ messages })
    }
}))

export const useIsPlaying = create<isSongStarted>((set) => ({
    isStarted: false,
    setIsStarted: (isStart: boolean) => {
        set({ isStarted: isStart })
    }
}))