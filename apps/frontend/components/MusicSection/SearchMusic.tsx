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

const SearchMusic = () => {
  const [suggestions, setSuggestions] = useState<[string[]]>([[]]);
  async function handleSearchQuery(query: string) {
    try {
      if(query.length == 0) return ;
      const res = await fetch(`/api/suggestion?query=${query}`);
      const suggestedResult = await res.json();
      setSuggestions(suggestedResult || [[]]);
    } catch (error) {
      console.log(error);
      setSuggestions([[]]);
    }
  }
  const debounceSearch = debounce(handleSearchQuery, 1000);
  return (
    <Command>
      <CommandInput
        onValueChange={(e) => debounceSearch(e)}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {suggestions && suggestions.map((suggestion, key) => (
            <CommandItem key={key}>{suggestion && suggestion[0]}</CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};

export default SearchMusic;
