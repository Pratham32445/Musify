import Image from "next/image";
import React from "react";

const RoomCard = () => {
  return (
    <div className="hover:bg-neutral-900 transition delay-150 duration-300 ease-in-out">
      <div>
        <Image src={"/new.jpeg"} alt="image" width={200} height={200} />
        <div>
          <p>Find Her</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
