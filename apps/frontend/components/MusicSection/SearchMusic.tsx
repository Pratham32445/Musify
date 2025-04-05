import React, { useState } from "react";
import { Input } from "../ui/input";

const SearchMusic = () => {
  const [searchSong, setSearchSong] = useState("");
  return (
    <div className="my-2">
      <Input onChange={(e) => setSearchSong(e.target.value)} />
    </div>
  );
};

export default SearchMusic;
