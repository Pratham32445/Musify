import Image from "next/image";
import React from "react";

const SongBar = () => {
  return (
    <div className="flex items-center gap-10">
      <div>
        <Image src={"/image1.jpeg"} width={250} height={200} alt="" />
      </div>
      <div>
        <p className="my-4">Song</p>
        <p className="text-5xl font-bold">Zara Zara</p>
        <p className="mt-5">Views : 101k</p>
      </div>
    </div>
  );
};

export default SongBar;
