import React from "react";
import axios from "axios";

const AllUser = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params;
  const users = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/room/${roomId}`
  );
  return (
    <div>
      {users.data.rooms.subscribers.map(
        (subscriber: { firstName: string; createdAt: Date }, idx) => (
          <div key={idx}>
            <p>{subscriber.firstName}</p>
          </div>
        )
      )}    
    </div>
  );
};

export default AllUser;
