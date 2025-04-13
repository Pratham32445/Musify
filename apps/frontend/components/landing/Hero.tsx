import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="pt-28">
      <h1 className="text-4xl font-bold text-center">
        A Platfrom to Connect People,
        <br /> Play Music and Watch to Gather
      </h1>
      <p className="text-center mt-2 text-xs text-neutral-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        sapiente <br /> impedit asperiores maiores omnis cumque quidem
      </p>
      <div className="flex justify-center">
        <Button className="mt-4 bg-green-500 hover:bg-green-600 cursor-pointer text-white px-10">
          Explore
        </Button>
      </div>
    </div>
  );
};

export default Hero;
