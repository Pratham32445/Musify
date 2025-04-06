"use client";
import { UseRoomId, useShowChat } from "@/store/Store";
import { useRouter } from "next/navigation";
import React from "react";

const RoomBar = () => {
  const { setShowChat } = useShowChat();
  const { roomId } = UseRoomId();
  const router = useRouter();
  const roomBarData = [
    {
      title: "chat",
      items: [
        { name: "# Home", to: "/Home" },
        { name: "# General", to: "/general" },
        {
          name: "# Live chat",
          to: "/live-chat",
          type: "click",
          param: true,
          func: setShowChat,
          onClick: (func: (param: boolean) => void, params: boolean) =>
            func(params),
        },
      ],
    },
    {
      title: "songs",
      items: [
        {
          name: "# Last Played",
          to: "/general",
          param: roomId,
          func: (id: string) => {
            router.push(`/rooms/me/${id}/last-played`);
          },
          onClick: (func: (id: string) => void, params: string) => {
            func(params);
          },
        },
      ],
    },
    {
      title: "call",
      items: [{ name: "# Group call", to: "/group-call" }],
    },

    {
      title: "users",
      items: [
        {
          name: "# all users",
          to: "/all-users",
          param: roomId,
          func: (id: string) => {
            router.push(`/rooms/me/${id}/all-users`);
          },
          onClick: (func: (id: string) => void, params: string) => {
            func(params);
          },
        },
        { name: "# online users", to: "/online-users" },
      ],
    },
    {
      title: "admins",
      items: [
        { name: "# admin", to: "/all-users" },
        { name: "# subadmins", to: "/online-users" },
      ],
    },
    {
      title: "Settings",
      items: [{ name: "# Group Settings", to: "/settings" }],
    },
  ];
  return (
    <div className="py-8">
      {roomBarData.map(({ title, items }, idx) => (
        <div key={idx} className="my-4">
          <p className="text-xs text-neutral-400">{title}</p>
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.func!(item.param)}
              className="my-1 cursor-pointer hover:bg-neutral-900 p-1"
            >
              <p className="text-neutral-400">{item.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RoomBar;
