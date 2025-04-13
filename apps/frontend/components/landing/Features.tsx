import { CircleCheck } from "lucide-react";
import React from "react";

const FeaturesData = [
  "Play Music to Gather",
  "Upvote Your Choice",
  "Watch Movie to Gather (working)",
  "Live Chat",
  "AI Suggessted Songs",
];

const Features = () => {
  return (
    <div>
      <div className="mt-28 flex justify-around">
        <div>
          <p className="text-2xl">Features</p>
          <div className="w-[30px] mt-2 h-1 bg-white"></div>
        </div>
        <div>
          {FeaturesData.map((feature, idx) => (
            <div className="flex gap-2 items-center my-4" key={idx}>
              <CircleCheck color="var(--color-green)" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
