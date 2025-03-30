import express from "express";
import { RoomRouter } from "./router/Room.router";
import { UserRouter } from "./router/User.router";

const app = express();

app.use("/room",RoomRouter);
app.use("/user",UserRouter);

const PORT = 3001;

app.listen(PORT,()=>{
    console.log("running")
})