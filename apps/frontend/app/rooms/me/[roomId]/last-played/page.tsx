"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseRoomId } from "@/store/Store";
import { Song } from "comman/shared-types";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const LastPlayed = () => {
  const { roomId } = UseRoomId();
  const [songs, setSongs] = useState<Song[] | null>(null);
  useEffect(() => {
    async function lastPlayedSong(roomId: string) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/get-songs/${roomId}`
      );
      setSongs(res.data.songs.lastPlayed);
    }
    lastPlayedSong(roomId!);
  }, []);

  if (!songs) {
    return (
      <div className="flex justify-center p-8">
        <LoaderCircle className="animate-spin" width={30} height={30} />
      </div>
    );
  }
  return (
    <ScrollArea className="h-96 p-4">
      {songs &&
        songs.map((song, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div>
              <Image src={song.thumbnail} width={150} height={150} alt="" />
            </div>
            <div>
              <p className="text-xs">{song.title}</p>
            </div>
          </div>
        ))}
    </ScrollArea>
  );
};

export default LastPlayed;
