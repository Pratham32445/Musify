import Image from "next/image";
import {ArrowBigUp} from "lucide-react"
import React from "react";

const SongQueueCard = () => {
  return (
    <div className="my-4 flex items-center justify-between hover:bg-neutral-800 p-2 rounded">
      <div className="flex items-center gap-4">
        <div>
          <Image src={"/image1.jpeg"} alt="" width={60} height={60} />
        </div>
        <div>
          <p>Tweaker</p>
          <p className="text-xs">Gelo</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <p>UpVote</p>
          <ArrowBigUp width={30} height={30}/>
        </div>
      </div>
      <div>
        <p>3:01</p>
      </div>
    </div>
  );
};

export default SongQueueCard;
