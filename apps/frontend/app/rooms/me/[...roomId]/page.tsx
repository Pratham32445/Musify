"use client";
import MusicSection from "@/components/MusicSection/MusicSection";
import { useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useQueue, UseRoomId, useWs } from "@/store/Store";
import { WsMessage } from "comman/message";
import { useSession } from "next-auth/react";

const RoomMusic = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { setWs, ws } = useWs();
  const { setQueue,setNewSong} = useQueue();
  const { setRoomId } = UseRoomId();
  const { data } = useSession();
  useEffect(() => {
    async function joinRoom() {
      try {
        const roomId = (await params).roomId[0];
        setRoomId(roomId);
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
            if (message.type == WsMessage.newSongUpdate) {
              setNewSong(message.payload.songInfo);
            } else if (message.type == WsMessage.QueueUpdate) {
              setQueue(message.payload.Queue);
              console.log(message.payload.Queue);
            }
          };
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
    joinRoom();
  }, [data]);

  return <MusicSection />;
};

export default RoomMusic;
