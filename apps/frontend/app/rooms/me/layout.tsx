"use client";
import Channels from "@/components/Channels";
import LiveChat from "@/components/MusicSection/LiveChat";
import RoomBar from "@/components/MusicSection/RoomBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCurrentSong, useIsPlaying, useSeekUpdate, useShowChat } from "@/store/Store";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const Me = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<null | ReactPlayer>(null);
  const { seek } = useSeekUpdate();
  const {show} = useShowChat();
  const { song } = useCurrentSong();
  const { isStarted, setIsStarted } = useIsPlaying();
  
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
          <ResizablePanel defaultSize={20}>
            <RoomBar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
          {show && <LiveChat />}
        </ResizablePanelGroup>
      </div>
      <div className="hidden">
        <ReactPlayer
          url={song?.url}
          playing={isStarted}
          controls={false}
          ref={playerRef}
          width="0"
          height="0"
        />
      </div>
    </div>
  );
};

export default Me;
