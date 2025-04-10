"use client";
import { useCurrentSong, useIsPlaying } from "@/store/Store";
import Image from "next/image";
import React from "react";
import {
  Plus,
  MessageSquare,
  Eye,
  Clock,
  LoaderCircle,
  Pause,
} from "lucide-react";
import { useShowChat } from "@/store/Store";
import { formattedDuration, viewsFormatter } from "@/lib/time";
import SongDurationSeek from "./SongDurationSeek";

const SongBar = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { song } = useCurrentSong();
  const { setShowChat } = useShowChat();
  const { isStarted } = useIsPlaying();
  return (
    <div>
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
                  {song.title.length > 30
                    ? song.title.substring(0, 30) + "..."
                    : song.title}
                </p>
                <p className="my-2">
                  {song.description.length > 150
                    ? song.description.substring(0, 150) + "..."
                    : song.description}
                </p>
              </div>
              <div className="flex gap-4 items-center my-2">
                <div
                  className={`bg-[#34ff7b] w-fit p-3 rounded-full transition-all duration-500 ${isStarted && "animate-pulse"}`}
                >
                  {!isStarted ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Pause color="#000" />
                  )}
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
                  <p className="font-bold">
                    {formattedDuration(song.duration)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye />
                  <p className="font-bold">{viewsFormatter(song.views)}</p>
                </div>
                <SongDurationSeek />
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
      </div>
    </div>
  );
};

export default SongBar;
