import React from "react";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";

const HeroRoomSearch = () => {
  return (
    <div className="w-1/2 m-auto mt-8 relative">
      <Input className="p-8" placeholder="Arijit Lover..." />
      <div className="absolute right-0 top-0 bg-neutral-600 p-3 m-2 rounded">
        <ArrowRight />
      </div>
    </div>
  );
};

export default HeroRoomSearch;
