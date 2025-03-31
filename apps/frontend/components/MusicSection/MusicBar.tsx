"use client";
import React, { useState } from "react";
import SongBar from "./SongBar";
import { FaMusic } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

const MusicBar = () => {
  const [type, setType] = useState(0);
  return (
    <div className="relative bg-[#981008] p-5">
      <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-60"></div>

      <div className="absolute left-0 right-0 bottom-0 h-20 w-full">
        <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-0 opacity-40 animate-pulse"></div>
        <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-1/4 opacity-30 animate-pulse delay-150"></div>
        <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-2/4 opacity-40 animate-pulse delay-300"></div>
        <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-3/4 opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <SongBar />
      </div>
      <div className="my-10 flex items-center gap-5">
        <div
          className={`${type == 0 ? "bg-[#1ed760]" : "bg-[#121212]"} p-5 rounded-full`}
        >
          <FaMusic color="#000" />
        </div>
        <div
          className={`${type == 1 ? "bg-[#1ed760]" : "bg-[#4b4b4b]"} p-5 rounded-full`}
        >
          <FaVideo color="#000" />
        </div>
      </div>
    </div>
  );
};

export default MusicBar;
