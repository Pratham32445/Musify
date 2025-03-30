import { WebSocketServer } from "ws"
import { UserManager } from "./Managers/UserManager"

const wss = new WebSocketServer({ port: 8080 })

const USER_ID = "ABC";

wss.on("connection", (ws) => {
    UserManager.getInstance().addUser(USER_ID, ws);
})