import Channels from "@/components/Channels";
import MusicSection from "@/components/MusicSection/MusicSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

const Me = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Channels />
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>One</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <MusicSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Me;
