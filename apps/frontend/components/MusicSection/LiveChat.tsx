"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { IoSendSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useShowChat } from "@/store/Store";

const LiveChat = () => {
  const { setShowChat } = useShowChat();
  return (
    <div className="pt-8 pr-4">
      <div className="w-[400px] relative h-[500px] rounded-xl bg-[#121212]">
        <div className="p-4 flex items-center justify-between">
          <p>Live Chat</p>
          <X onClick={() => setShowChat(false)} />
        </div>
        <hr className="mt-2" />
        <div></div>
        <div className="absolute w-full bottom-0 flex gap-4 p-2">
          <Textarea
            placeholder="Type your message here."
            rows={5}
            className="focus-visible:ring-0"
          />
          <Button>
            <IoSendSharp />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
