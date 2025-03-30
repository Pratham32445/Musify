import express from "express";
import { RoomRouter } from "./router/Room.router";
import { UserRouter } from "./router/User.router";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());    

app.use("/room",RoomRouter);
app.use("/user",UserRouter);

const PORT = 3001;

app.listen(PORT,()=>{
    console.log("running")
})