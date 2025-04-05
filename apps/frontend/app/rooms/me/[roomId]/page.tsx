"use client";
import MusicSection from "@/components/MusicSection/MusicSection";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  useCurrentSong,
  useMessages,
  useQueue,
  UseRoomId,
  useSeekUpdate,  
  useWs,
} from "@/store/Store";
import { WsMessage } from "comman/message";
import { useSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

const RoomMusic = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { setWs, ws } = useWs();
  const { setQueue, setNewSong } = useQueue();
  const { setRoomId } = UseRoomId();
  const { setCurrentSong } = useCurrentSong();
  const { updateSeek } = useSeekUpdate();
  const { data } = useSession();
  const { setMessage,setInitialMessages } = useMessages();
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    async function joinRoom() {
      try {
        const roomId = (await params).roomId;
        setRoomId(roomId);
        if(ws) setIsJoined(true)
        if (roomId && data?.user.id && !ws) {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/isValid-room/${roomId}`
          );  
          const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL!}?roomId=${roomId}&userId=${data?.user.id}`
          );
          ws.onopen = () => {
            setWs(ws);
            ws.send(
              JSON.stringify({ type: WsMessage.joinRoom, payload: { roomId } })
            );
          };
          ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.type == WsMessage.meJoined) {
              setIsJoined(true);
            } else if (message.type == WsMessage.newSongUpdate) {
              setNewSong(message.payload.songInfo);
              const audio = new Audio("/notification.mp3");
              audio.play();
            } else if (message.type == WsMessage.QueueUpdate) {
              setQueue(message.payload.Queue);
            } else if (message.type == WsMessage.currentSong) {
              setCurrentSong(message.payload);
            } else if (message.type == WsMessage.syncUpdate) {
              const serverSeek = message.payload.currentSeek;
              const serverTime = message.payload.timeStamp;
              const timeDiff = (Date.now() - serverTime) / 1000;
              const targetSeek = serverSeek + timeDiff;
              updateSeek(targetSeek);
            }
            else if(message.type == WsMessage.initialMessages) {
              setInitialMessages(message.payload.messages);
            } 
            else if (message.type == WsMessage.onMessage) {
              setMessage(message.payload.message);
              console.log(message.payload.message);
              if (message.payload.message.userId != data.user.id) {
                const audio = new Audio("/notification.mp3");
                audio.play();
              }
            }
          };
        }
      } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
    joinRoom();
  }, [data]);

  return isJoined ? (
    <MusicSection />
  ) : (
    <div className="flex justify-center pt-32">
      <LoaderCircle className="animate-spin" width={50} height={50} />
    </div>
  );
};  

export default RoomMusic;
