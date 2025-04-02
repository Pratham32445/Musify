import React from "react";
import SongQueueCard from "./SongQueueCard";
import { useQueue } from "@/store/Store";
import { ScrollArea } from "../ui/scroll-area";

const SongQueue = () => {
  const { queue } = useQueue();
  return (  
    <ScrollArea className="p-6 h-[calc(250px-1rem)]">
      <p className="text-xl">Song Queue</p>
      <div>
        {queue.length > 0 ? (
          queue.map((song, idx) => <SongQueueCard key={idx} song={song} />)
        ) : (
          <div className="flex justify-center pt-10">
            <p>No Song in the Queue</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default SongQueue;
