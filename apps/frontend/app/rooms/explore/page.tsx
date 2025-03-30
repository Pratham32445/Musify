import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ExploreRooms from "@/components/ExploreRooms";

const Explore = () => {
  return (
    <ResizablePanelGroup className="min-h-screen" direction="horizontal">
      <ResizablePanel defaultSize={25}>one</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ExploreRooms />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Explore;
