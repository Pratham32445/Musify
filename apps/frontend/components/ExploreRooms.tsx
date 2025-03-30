import React from "react";
import RoomCard from "./RoomCard";

const ExploreRooms = () => {
  return (
    <div className="p-8">
      <div>
        <p className="text-2xl font-bold">Trending Rooms</p>
        <div className="my-4 flex gap-8">
          {Array.from({ length: 5 }).map((_, idx) => (
            <RoomCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreRooms;
