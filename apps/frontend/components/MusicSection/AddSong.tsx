"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseRoomId, useWs } from "@/store/Store";
import { toast } from "sonner";
import { WsMessage } from "comman/message";

const AddSong = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { ws } = useWs();
  const { roomId } = UseRoomId();
  const [url, setUrl] = useState("");
  function addSong() {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    if (!url.match(regex)) {
      toast.error("Please provide the valid youtube url");
      return;
    }
    ws?.send(
      JSON.stringify({ type: WsMessage.addSong, payload: { roomId, url } })
    );
    setUrl("");
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Youtube Link in to Box</DialogTitle>
          <DialogDescription>
            After adding the song the song will be in the song Queue and it will
            rank according to the upvotes
          </DialogDescription>
        </DialogHeader>
        <Input
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Youtube Link Here..."
        />
        <Button
          onClick={addSong}
          className="bg-[#1ed760] cursor-pointer hover:bg-[#77ff75]"
        >
          Add Song
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSong;
