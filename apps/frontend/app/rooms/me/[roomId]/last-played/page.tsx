"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Song } from "comman/shared-types";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const LastPlayed = ({params} : {params : Promise<{roomId : string}>}) => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  useEffect(() => {
    async function lastPlayedSong() {
      const {roomId} = await params;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/get-songs/${roomId}`
      );
      setSongs(res.data.songs.lastPlayed);
    }
    lastPlayedSong();
  }, []);

  if (!songs) {
    return (
      <div className="flex justify-center p-8">
        <LoaderCircle className="animate-spin" width={30} height={30} />
      </div>
    );
  }
  return (
    <ScrollArea className="h-[calc(100vh-50px)]  p-4">
      {songs &&
        songs.map((song, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div>
              <Image src={song.thumbnail} width={150} height={150} alt="" />
            </div>
            <div>
              <p className="text-xs">{song.title}</p>
              <p className="text-xs my-2">{new Date(song.createdAt!).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
    </ScrollArea>
  );
};

export default LastPlayed;
