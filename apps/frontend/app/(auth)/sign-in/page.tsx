"use client";
import React, { useState } from "react";
import { Music } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const oAuthLoginData = [
  {
    icon: <FcGoogle />,
    title: "Login with Google",
  },
  {
    icon: <FaFacebook />,
    title: "Login with Facebook",
  },
  {
    icon: <FaApple />,
    title: "Login with Apple",
  },
];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function signInUser() {
    if (!email || !password) {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sign-in`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
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
          <h1 className="text-2xl my-3 font-bold">Log in to Music-Nights</h1>
        </div>
        <div className="flex flex-col items-center my-4">
          {oAuthLoginData.map(({ title, icon }, idx) => (
            <div
              className="flex justify-center items-center gap-5 border-1 w-[300px] p-2 px-8 border-white rounded-full my-2 cursor-pointer hover:bg-neutral-900"
              key={idx}
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/rooms/explore",
                })
              }
            >
              {icon}
              <p className="font-bold">{title}</p>
            </div>
          ))}
        </div>
        <div className="w-3/4 m-auto h-[1px] bg-neutral-600"></div>
        <div className="max-w-[300px] m-auto">
          <div className="my-4">
            <p>Email</p>
            <Input
              type="email"
              className="bg-transparent border-white border-2 outline-none focus-visible:ring-0 my-2 rounded-none "
              placeholder="johnDoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={signInUser}
            className="bg-[#1ed760] hover:bg-[#3be477] p-7 my-4 w-full rounded-full cursor-pointer text-white"
          >
            Continue
          </Button>
          <p className="text-sm">
            Don t have an account ?{" "}
            <Link href={"/sign-up"} className="underline">
              {" "}
              Sign up for Spotify{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
