"use client";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

const ChangeMode = () => {
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    console.log(theme);
    return () => {};
  }, [theme]);

  return (
    <div>
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
};

export default ChangeMode;
