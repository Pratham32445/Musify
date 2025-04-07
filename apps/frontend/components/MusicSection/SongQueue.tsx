import React from "react";
import SongQueueCard from "./SongQueueCard";
import { useCurrentSong, useQueue } from "@/store/Store";
import SearchMusic from "./SearchMusic";

const SongQueue = () => {
  const { queue } = useQueue();
  const { song } = useCurrentSong();
  return (
    <div className="p-6 h-[300px] bg-[#121212]">
      <div className="flex justify-between">
        <p className="text-xl">Song Queue</p>
        <div className="w-1/2 relative">
          <SearchMusic />
        </div>
      </div>
      <div>   
        {queue.length > 0 ? (
          queue.map((song, idx) => <SongQueueCard key={idx} song={song} />)
        ) : (
          <div className="flex justify-center pt-10">
            <p>{song ? "No Next Song" : "Song Queue is Empty"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongQueue;
