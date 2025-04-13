"use client";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { debounce } from "@/utils/debounce";
import { getVideoId } from "@/utils/getVideoDetails";
import { UseRoomId, useWs } from "@/store/Store";
import { WsMessage } from "comman/message";

const SearchMusic = () => {
  const [suggestions, setSuggestions] = useState<[string[]]>([[]]);
  const { ws } = useWs();
  const { roomId } = UseRoomId();
  async function handleSearchQuery(query: string) {
    try {
      if (query.length == 0) {
        setSuggestions([[]]);
        return;
      }
      const res = await fetch(`/api/suggestion?query=${query}`);
      const suggestedResult = await res.json();
      setSuggestions(suggestedResult || [[]]);
    } catch (error) {
      console.log(error);
      setSuggestions([[]]);
    }
  }
  async function addSong(query: string) {
    const videoId = await getVideoId(query);
    console.log(ws,"socket");
    ws?.send(
      JSON.stringify({ type: WsMessage.addSong, payload: { roomId, videoId } })
    );
    setSuggestions([[]]);
  }
  const debounceSearch = debounce(handleSearchQuery, 300);
  return (
    <Command>
      <CommandInput
        onValueChange={(e) => debounceSearch(e)}
        placeholder="Type a command or search..."
      />
      <CommandList > 
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup  heading="Suggestions">
          {suggestions &&
            suggestions.map((suggestion, key) => (
              <CommandItem onSelect={(value) => addSong(value)} key={key}>
                {suggestion && suggestion[0]}
              </CommandItem>
            ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};

export default SearchMusic;
