import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import ChangeMode from "../ChangeMode";
import {useTheme} from "next-themes"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} width={100} height={100} alt="Logo" />
          <p className="text-xl font-bold">Musify</p>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <p>Explore</p>
        <ChangeMode/>
        <Button className="bg-[var(--color-green)]">Log In</Button>
      </div>
    </div>
  );
};

export default Navbar;
