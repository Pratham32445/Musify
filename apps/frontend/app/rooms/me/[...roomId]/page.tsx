"use client";
import MusicSection from "@/components/MusicSection/MusicSection";
import React, { useState } from "react";
import { useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useWs } from "@/store/Store";

const RoomMusic = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const session = useSession();
  const { setWs } = useWs();
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    async function joinRoom() {
      try {
        const roomId = (await params).roomId[0];
        if (roomId) {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/isValid-room/${roomId}`
          );
          if (session.data?.user.id) {
            const ws = new WebSocket(
              `${process.env.NEXT_PUBLIC_WS_URL!}?roomId=${session.data?.user.id}`
            );
            ws.onopen = () => {
              setWs(ws);
              ws.send(
                JSON.stringify({ type: "joinRoom", payload: { roomId } })
              );
              setIsJoined(true);
            };
          }
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data.message);
          toast.error(error.response?.data.message);
        }
      }
    }
    joinRoom();
  });
  return <MusicSection />;
};

export default RoomMusic;
