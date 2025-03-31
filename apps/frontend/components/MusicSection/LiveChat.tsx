import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { IoSendSharp } from "react-icons/io5";
import { Button } from "../ui/button";

const LiveChat = () => {
  return (
    <div className="pt-8 pr-4">
      <div className="w-[400px] relative h-[500px] rounded-xl bg-[#121212]">
        <div className="p-4">
          <p>Live Chat</p>
          <hr className="mt-2" />
        </div>
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
