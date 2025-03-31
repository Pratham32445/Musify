import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddSong = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
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
        <Input placeholder="Paste Youtube Link Here..." />
        <Button className="bg-[#1ed760] cursor-pointer hover:bg-[#77ff75]">
          Add Song
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSong;
