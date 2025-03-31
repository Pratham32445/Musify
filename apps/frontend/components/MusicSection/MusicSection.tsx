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
      <ScrollArea className="bg-[#121212] h-[calc(100vh-4rem)] m-8 rounded-xl overflow-hidden w-full">
        <MusicBar setShowChat={setShowChat} />
        <SongQueue />
      </ScrollArea>
      {showChat && <LiveChat />}
    </div>
  );
};

export default MusicSection;
