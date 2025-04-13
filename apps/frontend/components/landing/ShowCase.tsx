import Image from "next/image";
import React from "react";

const ShowCase = () => {
  return (
    <div className="flex justify-center mt-10">
      <Image className="opacity-80" src={"/showcase.png"} width={800} height={600} alt="showcase" />
    </div>
  );
};

export default ShowCase;
