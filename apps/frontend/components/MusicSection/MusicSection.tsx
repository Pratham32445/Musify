"use client";
import React, { useState } from "react";
import MusicBar from "./MusicBar";
import SongQueue from "./SongQueue";
import { ScrollArea } from "@/components/ui/scroll-area";
import LiveChat from "./LiveChat";

const MusicSection = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="flex">
      <div className="bg-[#121212] h-[3/4] flex flex-col m-8 rounded-xl overflow-hidden w-full">
        <div>
          <MusicBar setShowChat={setShowChat} />
        </div>
        <SongQueue />
      </div>
      {showChat && <LiveChat />}
    </div>
  );
};

export default MusicSection;
