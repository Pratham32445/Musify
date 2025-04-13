"use client";
import MusicSection from "@/components/MusicSection/MusicSection";
import { useIsJoined } from "@/store/Store";
import { LoaderCircle } from "lucide-react";

const RoomMusic = () => {
  const { isJoined } = useIsJoined();

  return isJoined ? (
    <MusicSection />
  ) : (
    <div className="flex justify-center pt-32">
      <LoaderCircle className="animate-spin" width={50} height={50} />
    </div>
  );
};

export default RoomMusic;
