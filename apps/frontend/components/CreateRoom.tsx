import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";

const CreateRoom = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [roomObj, setRoomObj] = useState({
    Name: "",
    isPrivate: false,
    thumbnail: "",
  });
  const [errors, setErrors] = useState({
    Name: "",
    isPrivate: "",
    thumbnail: "",
  });
  const [joinRoomId, setJoinRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function roomInfo(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value, files } = e.target;
    setRoomObj((prev) => ({
      ...prev,
      [name]: type == "checkbox" ? checked : files ? files[0] : value,
    }));
  }
  async function createRoom() {
    try {
      setErrors({
        Name: "",
        isPrivate: "",
        thumbnail: "",
      });
      setIsLoading(true);
      const tokenData = await axios.get("/api/token");
      const room = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/create-room`,
        roomObj,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      toast.success("Room Created", {
        position: "top-right",
        style: {
          backgroundColor: "#1ed760",
        },
      });
      setIsLoading(false);
      setOpen(false);
      router.push(`/rooms/me/${room.data.roomId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrors(error.response?.data.errors);
        setIsLoading(false);
        console.log(error.response?.data.errors);
      }
    }
  }
  async function joinRoom() {
    try {
      const tokenData = await axios.get("/api/token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/room/joinRoom`,
        { roomId: joinRoomId },
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      toast.success("Joined Successfully", {
        position: "top-right",
        style: {
          backgroundColor: "#1ed760",
        },
      });
      setOpen(false);
      router.push(`/rooms/me/${joinRoomId}`);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error.response?.data.message);
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent>
        <Tabs defaultValue="create" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="create">Create Room</TabsTrigger>
            <TabsTrigger value="join">Join Room</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="mt-5">
            <DialogHeader>
              <DialogTitle>Create a New Room</DialogTitle>
              <DialogDescription>
                Add specific details below and create your own room
              </DialogDescription>
              <div className="my-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name" className="my-2">
                    Room Name
                  </Label>
                  <Input
                    onChange={roomInfo}
                    name="Name"
                    type="text"
                    id="name"
                    placeholder="Room Name..."
                  />
                </div>
                <p className="text-xs my-1 text-red-400"> {errors.Name}</p>
                <div className="my-6 flex gap-4 items-center">
                  <p>Private :</p>
                  <Switch
                    onCheckedChange={(checked) =>
                      setRoomObj((prev) => ({
                        ...prev,
                        isPrivate: checked,
                      }))
                    }
                    name="isPrivate"
                  />
                </div>
                <p> {errors.isPrivate}</p>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Room Thumbnail</Label>
                  <Input
                    onChange={roomInfo}
                    name="thumbnail"
                    id="picture"
                    type="file"
                    className="my-2 w-[150px]"
                  />
                </div>
                <p>{errors.thumbnail}</p>
                <Button
                  onClick={createRoom}
                  disabled={isLoading}
                  className="my-2 float-right bg-[#1ed760]"
                >
                  Create {isLoading && <Loader />}
                </Button>
              </div>
            </DialogHeader>
          </TabsContent>
          <TabsContent value="join">
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="Id" className="my-2">
                  Room Id
                </Label>
                <Input
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  name="Id"
                  type="text"
                  id="name"
                  placeholder="Paste Room Id..."
                />
              </div>
              <Button
                onClick={joinRoom}
                className="my-2 float-right bg-[#1ed760]"
              >
                Join Room
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
