import type WebSocket from "ws";
import { User } from "../User";

export class UserManager {
    users: Map<string, User>;
    static instance: UserManager;
    constructor() {
        this.users = new Map();
    }
    static getInstance() {
        if (UserManager.instance) return UserManager.instance;
        UserManager.instance = new UserManager();
        return UserManager.instance;
    }
    addUser(userId: string, ws: WebSocket) {
        if (this.users.has(userId)) return;
        const newUser = new User(userId, ws);
        this.users.set(userId, newUser);
        console.log(this.users.size);
    }
    removeUser(userId: string) {
        this.users.delete(userId);
    }
}