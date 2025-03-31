import React from "react";
import SongQueueCard from "./SongQueueCard";

const SongQueue = () => {
  return (
    <div className="p-6">
      <p className="text-xl">Song Queue</p>
      <div>
        <SongQueueCard />
        <SongQueueCard />
        <SongQueueCard />
        <SongQueueCard />
      </div>
    </div>
  );
};

export default SongQueue;
