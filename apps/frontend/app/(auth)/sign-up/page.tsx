"use client";
import React, { useState } from "react";
import { Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function signUpUser() {
    if (!name || !email || !password) {
      toast.error("Please Provide all the fields", {
        position: "top-right",
        style: {
          backgroundColor: "#ef4444",
        },
      });
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sign-up`,
        {
          firstName: name.split(" ")[0],
          email,
          password,
        },
        { withCredentials: true }
      );
      setName("");
      setEmail("");
      setPassword("");
      toast.success(res.data.message, {
        style: {
          background: "#1ed760",
        },
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="w-full min-h-screen pt-10"
      style={{
        background:
          "linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%);",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      }}
    >
      <div className="max-w-3xl m-auto bg-[#121212] h-auto p-4 rounded-xl">
        <div className="flex flex-col items-center">
          <Music width={50} height={50} className="my-1" />
          <h1 className="text-2xl my-3 font-bold">Sign Up to Music-Nights</h1>
        </div>
        <div className="w-3/4 m-auto h-[1px] bg-neutral-600"></div>
        <div className="max-w-[300px] m-auto">
          <div className="my-4">
            <p>Name</p>
            <Input
              type="text"
              className="bg-transparent border-white border-2 outline-none focus-visible:ring-0 my-2 rounded-none "
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="my-4">
            <p>Email</p>
            <Input
              type="email"
              className="bg-transparent border-white border-2 outline-none focus-visible:ring-0 my-2 rounded-none "
              placeholder="johnDoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="my-4">
            <p>Password</p>
            <Input
              type="password"
              className="bg-transparent border-white border-2 outline-none focus-visible:ring-0 my-2 rounded-none"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={signUpUser}
            className="bg-[#1ed760] hover:bg-[#3be477] p-7 my-4 w-full rounded-full cursor-pointer text-white"
          >
            Continue
          </Button>
          <p className="text-sm">
            Already have an Account?{" "}
            <Link href={"/sign-in"} className="underline">
              {" "}
              Sigin to Music-Nights{" "}
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SignUp;
