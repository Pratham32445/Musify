"use client";
import Image from "next/image";
import { ArrowBigUp } from "lucide-react";
import React from "react";
import { Song } from "comman/shared-types";
import { UseRoomId, useWs } from "@/store/Store";
import { useSession } from "next-auth/react";
import { WsMessage } from "comman/message";
import { formattedDuration } from "@/lib/time";

const SongQueueCard = ({ song }: { song: Song }) => {
  const { ws } = useWs();
  const { roomId } = UseRoomId();
  const { data } = useSession();
  function upVoteSong(songId: string) {
    if (data?.user.id && ws) {
      ws.send(
        JSON.stringify({
          type: WsMessage.upVote,
          payload: {
            songId,
            userId: data.user.id,
            roomId,
          },
        })
      );
    }
  }

  return (
    <div className="my-4 flex items-center justify-between hover:bg-neutral-800 p-2 rounded">
      <div className="flex items-center w-2/4 gap-4">
        <div>
          <Image src={song.thumbnail} alt="" width={60} height={60} />
        </div>
        <div>
          <p>
            {song.title.length > 30
              ? song.title.substring(0, 30) + "..."
              : song.title}
          </p>
          <p className="text-xs">Gelo</p>
        </div>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <div className="flex items-center gap-3">
          <p className="text-md">UpVote : </p>
          <div className="flex items-center gap-2">
            <p>{song.upvotesLength} </p>
            <ArrowBigUp
              className="cursor-pointer"
              onClick={() => upVoteSong(song.id)}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <p>{formattedDuration(song.duration)}</p>
      </div>
    </div>
  );
};

export default SongQueueCard;
