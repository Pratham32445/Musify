"use client";
import Channels from "@/components/Channels";
import LiveChat from "@/components/MusicSection/LiveChat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import UserInfo from "@/components/UserInfo";
import {
  useCurrentSong,
  useIsPlaying,
  useSeekUpdate,
  useShowChat,
} from "@/store/Store";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { usePathname } from "next/navigation";
import RoomBar from "@/components/MusicSection/RoomBar";

const Me = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<null | ReactPlayer>(null);
  const { seek } = useSeekUpdate();
  const { show } = useShowChat();
  const { song } = useCurrentSong();
  const { isStarted, setIsStarted } = useIsPlaying();
  const pathname = usePathname();

  useEffect(() => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      if (Math.abs(currentTime - seek) > 1) {
        playerRef.current.seekTo(seek, "seconds");
        if (isStarted == false) setIsStarted(true);
      }
    }
  }, [seek]);

  return (
    <div className="flex w-full min-h-screen">
      <Channels />
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={15}>
            {pathname == "/rooms/me" ? <UserInfo /> : <RoomBar />}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
          {show && <LiveChat />}
        </ResizablePanelGroup>
      </div>
      <div className="hidden">
        {song && (
          <ReactPlayer
            url={song?.url}
            playing={isStarted}
            controls={false}
            ref={playerRef}
            width="0"
            height="0"
          />
        )}
      </div>
    </div>
  );
};

export default Me;
