"use client";
import MusicSection from "@/components/MusicSection/MusicSection";
import { useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { UseRoomId, useWs } from "@/store/Store";

const RoomMusic = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { setWs } = useWs();
  const {setRoomId} = UseRoomId();
  useEffect(() => {
    async function joinRoom() {
      try {
        const roomId = (await params).roomId;
        setRoomId(roomId);
        if (roomId) {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/isValid-room/${roomId}`
          );
          const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL!}?roomId=${roomId}`
          );
          ws.onopen = () => {
            setWs(ws);
          };
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
    joinRoom();
  }, []);

  return <MusicSection />;
};

export default RoomMusic;
