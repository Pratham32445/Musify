import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ExploreRooms from "@/components/ExploreRooms";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/Options";

const Explore = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
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
