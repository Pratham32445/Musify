import React from "react";
import MusicBar from "./MusicBar";
import SongQueue from "./SongQueue";
import { ScrollArea } from "@/components/ui/scroll-area"

const MusicSection = () => {
  return (
    <ScrollArea className="bg-[#121212] h-[calc(100vh-4rem)] m-8 rounded-xl overflow-hidden">
      <MusicBar />
      <SongQueue />
    </ScrollArea>  
  );
};

export default MusicSection;
