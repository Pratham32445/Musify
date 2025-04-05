"use client";
import React, { useState } from "react";
import SongBar from "./SongBar";
import AddSong from "./AddSong";


const MusicBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <SongBar setOpen={setOpen} />
      <AddSong open={open} setOpen={setOpen} />
    </div>
  );
};

export default MusicBar;
