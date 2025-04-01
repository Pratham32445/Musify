import RoomCard from "@/components/RoomCard";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <div className="max-w-3xl m-auto pt-20">
      <div>
        <p className="my-3">Search Rooms</p>
        <Input type="text" placeholder="Write Room Name... or Id" />
      </div>
      <div className="my-16">
        <p className="my-3">Trending Rooms...</p>
        <div className="flex flex-wrap gap-8">
          <RoomCard />
          <RoomCard />  
          <RoomCard />
        </div>
      </div>
    </div>
  );
};

export default page;
