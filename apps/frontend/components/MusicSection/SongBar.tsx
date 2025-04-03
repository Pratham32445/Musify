"use client";
import { useCurrentSong, useSeekUpdate } from "@/store/Store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Play, Plus, MessageSquare, Eye, Clock } from "lucide-react";
import { useShowChat } from "@/store/Store";
import ReactPlayer from "react-player";
import { formattedDuration, viewsFormatter } from "@/lib/time";

const SongBar = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { song } = useCurrentSong();
  const [type, setType] = useState(0);
  const { setShowChat } = useShowChat();
  const { seek } = useSeekUpdate();
  const [pause, setPause] = useState(false);
  const playerRef = useRef<null | ReactPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log(currentTime,seek);
      if (Math.abs(currentTime - seek) > 1) {
        playerRef.current.seekTo(seek, "seconds");
      }
    }
  }, [seek]);


  return (
    <div
      className={`flex ${!song && "bg-[#34ff7b]"} items-center gap-10 w-full h-[400px] relative`}
    >
      {song ? (
        <div>
          <Image
            src={song.thumbnail}
            fill
            alt=""
            className="opacity-30 object-cover"
          />
          <div className="z-50 absolute w-full p-5">
            <div>
              <p className="font-bold text-3xl my-2">
                {song.title.substring(0, 30) +
                  (song.title.length > 30 && "...")}{" "}
              </p>
              <p className="my-2">
                {song.description.substring(0, 150) +
                  (song.title.length > 100 && "...")}
              </p>
            </div>
            <div className="flex gap-4 items-center my-2">
              <div className="bg-[#34ff7b] w-fit p-3 rounded-full">
                <Play color="#000" className="cursor-pointer" />
              </div>
              <div>
                <Plus
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <MessageSquare
                  className="cursor-pointer"
                  onClick={() => setShowChat(true)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Clock width={20} />
                <p className="font-bold">{formattedDuration(song.duration)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Eye />
                <p className="font-bold">{viewsFormatter(song.views)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <p className="flex justify-center text-center text-black gap-4 font-bold">
            Song Queue is Currently Empty Add song
            <Plus
              className="cursor-pointer"
              color="#000"
              onClick={() => setOpen(true)}
            />
          </p>
        </div>
      )}
      {song && (
        <div className="hidden">
          <ReactPlayer
            url={song?.url}
            playing={true}
            controls={false}
            ref={playerRef}
            width="0"
            height="0"
          />
        </div>
      )}
    </div>
  );
};

export default SongBar;
