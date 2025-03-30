"use client";
import Image from "next/image";
import React, { useState } from "react";
import { User } from "lucide-react";

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
  return (
    <div className="mt-10">
      <div className="my-4 flex items-center gap-4">
        <div
          onClick={() => setSelectedChannel(-1)}
          className={`w-1 h-${selectedChannel == -1 ? "8" : "1"} bg-white rounded-full`}
        ></div>
        <div className="w-[40px] h-[40px] flex justify-center items-center rounded bg-[#1ed760]">
          <User />
        </div>
      </div>
      {randomImages.map((img, idx) => (
        <div
          onClick={() => setSelectedChannel(idx)}
          className="my-4 flex items-center gap-4"
          key={idx}
        >
          <div
            className={`w-1 h-${selectedChannel == idx ? "8" : "1"} bg-white rounded-full`}
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
    </div>
  );
};

export default Channels;
