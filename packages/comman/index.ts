import {z} from "zod";

export const CreateRoomSchema = z.object({
    name : z.string().min(1,"Please Provide Room Name"),
    
})