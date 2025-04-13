"use client";
import {
  useCurrentSong,
  useIsJoined,
  useMessages,
  useQueue,
  UseRoomId,
  useSeekUpdate,
  useWs,
} from "@/store/Store";
import { isAxiosError } from "axios";
import { WsMessage } from "comman/message";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ roomId: string }>;
}) => {
  const { data } = useSession();
  const { ws, setWs } = useWs();
  const { setIsJoined } = useIsJoined();
  const { setNewSong, setQueue } = useQueue();
  const { setCurrentSong } = useCurrentSong();
  const { updateSeek } = useSeekUpdate();
  const { setRoomId } = UseRoomId();
  const {setInitialMessages,setMessage} = useMessages();
  useEffect(() => {
    if (!data) return;
    let socket: WebSocket;
    let roomId: string;
    const audio = new Audio("/notification.mp3");
    async function joinRoom() {
      try {
        roomId = (await params).roomId;
        setRoomId(roomId);
        if (roomId && !ws) {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/isValid-room/${roomId}`
          );
          socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_URL!}?roomId=${roomId}&userId=${data?.user.id}`
          );
          socket.onopen = () => {
            setWs(socket);
            socket.send(
              JSON.stringify({
                type: WsMessage.joinRoom,
                payload: {
                  roomId,
                },
              })
            );
          };
          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const type = message.type;
            switch (type) {
              case WsMessage.meJoined:
                setIsJoined(true);
                break;
              case WsMessage.newSongUpdate:
                setNewSong(message.payload.songInfo);
                audio.play();
                break;
              case WsMessage.QueueUpdate:
                setQueue(message.payload.Queue);
                break;
              case WsMessage.currentSong:
                setCurrentSong(message.payload);
                break;
              case WsMessage.syncUpdate:
                const serverSeek = message.payload.currentSeek;
                const serverTime = message.payload.timeStamp;
                const timeDiff = (Date.now() - serverTime) / 1000;
                const targetSeek = serverSeek + timeDiff;
                updateSeek(targetSeek);
                break;
              case WsMessage.noNextSong:
                setCurrentSong(null);
                break;
              case WsMessage.initialMessages:
                setInitialMessages(message.payload.messages);
              case WsMessage.toastMessage:
                toast.message(message.payload.message, {
                  duration: 20000,
                });
                break;
              case WsMessage.onMessage:
                setMessage(message.payload.message);
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

    function handleCloseEvents() {
      if (socket && socket.readyState == WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: WsMessage.disconnectSocket,
            payload: {
              roomId,
            },
          })
        );
      }
    }

    window.addEventListener("beforeunload", handleCloseEvents);

    return () => {
      if (ws) {
        console.log("socket");
      }
    };
  }, [data,params]);

  return <div>{children}</div>;
};

export default Layout;
