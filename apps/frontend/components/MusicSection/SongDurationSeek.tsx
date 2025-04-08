import { formattedDuration } from "@/lib/time";
import { useCurrentSong, useSeekUpdate } from "@/store/Store";
import React, { useEffect, useState } from "react";

const SongDurationSeek = () => {
  const { song } = useCurrentSong();
  const { seek } = useSeekUpdate();
  const [currentSongSeek, setCurrentSongSeek] = useState(0);

  useEffect(() => {
    console.log(seek);
  }, [seek]);

  if (!song) return <div></div>;

  const progressPercent = (seek / song.duration) * 100;

  return (
    <div className="w-[300px]">
      <div className="w-full h-2 bg-neutral-700 rounded relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-white transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-sm mt-1 text-white/70">
        <p>{formattedDuration(seek)}</p>
        <p>{formattedDuration(song.duration)}</p>
      </div>
    </div>
  );
};

export default SongDurationSeek;
