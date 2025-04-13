import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const FeatureRequest = () => {
  return (
    <div className="flex justify-center mt-16">
      <div>
        <p className="text-2xl">Feature Request</p>
        <div className="w-[30px] mt-2 h-1 bg-white"></div>
        <div className="flex gap-4 mt-16">
          <div className="w-1/2">
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              repudiandae, unde, vitae non neque libero exercitationem laborum
              accusantium nostrum quaerat aperiam. Nisi, corrupti magni illo
            </p>
          </div>
          <div className="w-1/2">
            <Textarea
              className="h-28"
              placeholder="Write what Next Feature you Want..."
            />
            <Button className="mt-2 text-xs bg-green-600 hover:bg-green-600 text-white cursor-pointer">
              Create Request
            </Button>
          </div>
        </div>
        <hr className="my-10" />
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Musify
        </span>
      </div>
    </div>
  );
};

export default FeatureRequest;
