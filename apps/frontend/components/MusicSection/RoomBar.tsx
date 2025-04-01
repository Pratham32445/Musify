import React from "react";

const roomBarData = [
  {
    title: "chat",
    items: [
      { name: "# General", to: "/general" },
      { name: "# Live chat", to: "/live-chat" },  
    ],
  },
  {
    title: "songs",
    items: [
      { name: "# Last Played", to: "/general" },
    ],
  },
  {
    title: "call",
    items: [{ name: "# Group call", to: "/group-call" }],
  },
  {
    title: "users",
    items: [
      { name: "# all users", to: "/all-users" },
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

const RoomBar = () => {
  return (
    <div className="py-8">
      {roomBarData.map(({ title, items }, idx) => (
        <div key={idx} className="my-4">
          <p className="text-xs text-neutral-400">{title}</p>
          {items.map((item, idx) => (
            <div
              key={idx}
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
