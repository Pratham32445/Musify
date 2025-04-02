import { useCurrentSong } from "@/store/Store";
import Image from "next/image";
import React from "react";

const SongBar = () => {
  const { song } = useCurrentSong();
  console.log(song);
  return (
    song && (
      <div className="flex items-center gap-10 w-full">
        <div className="w-1/4">
          <Image src={song.thumbnail} width={250} height={200} alt="" />
        </div>
        <div className="w-3/4">
          <p className="my-4">Song</p>
          <p className="text-5xl font-bold">
            {song.title.substring(0,20) + (song.title.length > 20 && "..")}
          </p>
          <p className="text-xs mt-5">
            {song.description}
          </p>
          <p className="mt-5">Views : {song.views}k</p>
        </div>
      </div>
    )
  );
};

export default SongBar;
