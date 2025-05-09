"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User, Plus, LoaderCircle } from "lucide-react";
import CreateRoom from "./CreateRoom";
import axios from "axios";
import { Room } from "comman/shared-types";
import { useRouter, usePathname } from "next/navigation";

const Channels = () => {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    async function getUserChannels() {
      const tokenData = await axios.get("/api/token");
      const roomsData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/room/get-rooms`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      setIsLoading(false);
      setRooms(roomsData.data.rooms);
    }
    getUserChannels();
  }, []);

  useEffect(() => {
    const pathNameSplit = pathName.split("/");
    if (pathNameSplit[pathNameSplit.length - 1] == "me") setSelectedChannel("");
    else setSelectedChannel(pathNameSplit[pathNameSplit.length - 1]);
  }, []);

  function goToChannel(Id: string) {
    setSelectedChannel(Id);
    router.push(`/rooms/me/${Id}`);
  }

  return (
    <div className="mt-10">
      <div
        className="my-4 flex items-center gap-4 pr-4 cursor-pointer"
        onClick={() => {
          setSelectedChannel("");
          router.push(`/rooms/me`);
        }}
      >
        <div
          className={`w-1 h-${selectedChannel == "" ? "8" : "1"} bg-white rounded-full`}
        ></div>
        <div className="w-[40px] h-[40px] flex justify-center items-center rounded bg-[#1ed760]">
          <User />
        </div>
      </div>
      {!isLoading ? (
        rooms &&
        rooms.map((room, idx) => (
          <div
            onClick={() => goToChannel(room.Id)}
            className="my-4 flex items-center gap-4 pr-4 cursor-pointer"
            key={idx}
          >
            <div
              className={`w-1 h-${selectedChannel == room.Id ? "8" : "3"} bg-white rounded-full`}
            ></div>
            {room.thumbnail ? (
              <Image
                src={room.thumbnail}
                className="rounded"
                alt="img"
                width={40}
                height={40}
              />
            ) : (
              <div
                className={`flex justify-center items-center ${selectedChannel != room.Id ? "bg-neutral-700" : "bg-[#5865F2]"} w-full p-2 rounded`}
              >
                <p>{room.Name[0].toUpperCase()}</p>
                <p>
                  {room.Name.split(" ").length > 1
                    ? room.Name.split(" ")[1][0]
                    : "r"}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <LoaderCircle className="animate-spin ml-5" />
      )}
      <div
        className="my-4 ml-5 p-2 
      cursor-pointer bg-[#34ff7b] w-fit rounded"
        onClick={() => setOpen(true)}
      >
        <Plus />
      </div>
      <CreateRoom open={open} setOpen={setOpen} />
    </div>
  );
};

export default Channels;
