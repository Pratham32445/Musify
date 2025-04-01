"use client";
import Image from "next/image";
import React, { useState } from "react";
import { User, Plus } from "lucide-react";
import CreateRoom from "./CreateRoom";

const randomImages = [
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
  "https://picsum.photos/800/600?random=5",
  "https://picsum.photos/800/600?random=6",
  "https://picsum.photos/800/600?random=7",
  "https://picsum.photos/800/600?random=8",
];

const Channels = () => {
  const [selectedChannel, setSelectedChannel] = useState(-1);
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-10">
      <div
        className="my-4 flex items-center gap-4 pr-4 cursor-pointer"
        onClick={() => setSelectedChannel(-1)}
      >
        <div
          className={`w-1 h-${selectedChannel == -1 ? "8" : "1"} bg-white rounded-full`}
        ></div>
        <div className="w-[40px] h-[40px] flex justify-center items-center rounded bg-[#1ed760]">
          <User />
        </div>
      </div>
      {randomImages.map((img, idx) => (
        <div
          onClick={() => setSelectedChannel(idx)}
          className="my-4 flex items-center gap-4 pr-4 cursor-pointer"
          key={idx}
        >
          <div
            className={`w-1 h-${selectedChannel == idx ? "8" : "3"} bg-white rounded-full`}
          ></div>
          <Image
            src={img}
            className="rounded"
            alt="img"
            width={40}
            height={40}
          />
        </div>
      ))}
      <div
        className="my-4 ml-5 p-2 
      cursor-pointer bg-[#34ff7b] w-fit rounded"
        onClick={() => setOpen(true)}
      >
        <Plus />
      </div>
      <CreateRoom open={open} setOpen={setOpen} />
    </div>
  );
};

export default Channels;
