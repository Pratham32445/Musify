import { WebSocketServer } from "ws"
import { UserManager } from "./Managers/UserManager"

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws, req) => {
    const user_Id = new URLSearchParams(req.url?.split("?")[1]).get("userId");  
    if (!user_Id) return;
    UserManager.getInstance().addUser(user_Id, ws);
})