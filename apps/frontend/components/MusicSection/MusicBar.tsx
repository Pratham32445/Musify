"use client";
import React, { useState } from "react";
import SongBar from "./SongBar";
import { FaMusic, FaVideo } from "react-icons/fa";
import { CirclePlus } from "lucide-react";
import AddSong from "./AddSong";
import { BsChatLeftTextFill } from "react-icons/bs";

const MusicBar = ({setShowChat} : {setShowChat : (showChat : boolean)=> void}) => {

  const [type, setType] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative bg-[#981008] p-5">
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none"></div>

        <div className="absolute left-0 right-0 bottom-0 h-20 w-full pointer-events-none">
          <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-0 opacity-40 animate-pulse"></div>
          <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-1/4 opacity-30 animate-pulse delay-150"></div>
          <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-2/4 opacity-40 animate-pulse delay-300"></div>
          <div className="w-1/4 h-20 bg-gradient-to-t from-black to-transparent absolute left-3/4 opacity-30 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <SongBar />
        </div>

        <div className="my-10 flex items-center gap-5 relative z-20">
          <div
            className={`${type === 0 ? "bg-[#1ed760]" : "bg-[#121212]"} p-5 rounded-full cursor-pointer`}
            onClick={() => setType(0)}
          >
            <FaMusic color="#000" />
          </div>
          <div
            className={`${type === 1 ? "bg-[#1ed760]" : "bg-[#4b4b4b]"} p-5 rounded-full cursor-pointer`}
            onClick={() => setType(1)}
          >
            <FaVideo color="#000" />
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(true)}>
            <CirclePlus className="cursor-pointer" />
          </div>
          <div className="cursor-pointer" onClick={() => setShowChat(true)}>
            <BsChatLeftTextFill className="cursor-pointer" />
          </div>
        </div>
      </div>
      <AddSong open={open} setOpen={setOpen} />
    </div>
  );
};

export default MusicBar;
