"use client";
import React from "react";
import MusicBar from "./MusicBar";
import SongQueue from "./SongQueue";

const MusicSection = () => {
  return (
    <div className="flex">
      <div className="bg-[#121212] h-[3/4] flex flex-col m-4 rounded-xl overflow-hidden w-full">
        <div>
          <MusicBar />
        </div>
        <SongQueue /> 
      </div>
    </div>
  );
};

export default MusicSection;