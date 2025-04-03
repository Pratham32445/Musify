"use client";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useMessages, UseRoomId, useShowChat, useWs } from "@/store/Store";
import { useSession } from "next-auth/react";
import { WsMessage } from "comman/message";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const LiveChat = () => {
  const { setShowChat } = useShowChat();
  const [message, setMessage] = useState("");
  const { ws } = useWs();
  const { roomId } = UseRoomId();
  const { data } = useSession();
  const { messages } = useMessages();
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(message);
    ws?.send(
      JSON.stringify({
        type: WsMessage.sendMessage,
        payload: {
          userId : data!.user.id!,
          roomId,
          message,
          userName: data?.user.name,
          time: Date.now(),
        },
      })
    );
    setMessage("")
  }

  return (
    <div className="pt-8 pr-4">
      <div className="w-[400px] relative h-[500px] rounded-xl bg-[#121212]">
        <div className="p-4 flex items-center justify-between">
          <p>Live Chat</p>
          <X onClick={() => setShowChat(false)} />
        </div>
        <hr className="mt-2" />
        <ScrollArea className="p-4 h-[380px]">
          {messages.map(({ message, time, userName }, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-neutral-600 w-fit p-2 rounded mb-5"
            >
              <div className="bg-[#34ff7b] w-[30px] h-[30px] rounded-full flex justify-center items-center">
                <p className="uppercase">{userName[0]}</p>
              </div>
              <div>
                <p className="text-xs">{userName}</p>
                <p>{message}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <form
          onSubmit={sendMessage}
          className="absolute w-full bottom-0 flex gap-4 p-2"
        >
          <Input
            placeholder="Type your message here."
            className="focus-visible:ring-0 h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">
            <IoSendSharp />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;

