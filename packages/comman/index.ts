import { z } from "zod";

export const CreateRoomSchema = z.object({
    name: z.string().min(1, "Please Provide Room Name"),
})

export const signUpSchema = z.object({
    firstName: z.string().min(1, "firstName is required"),
    email: z.string().email("email should be valid"),
    password: z.string().min(6, "Password should be greater than 6 character"),
})

export const signInSchema = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string()
})

export const createRoomSchema = z.object({
    Name : z.string().min(1,"Please Provide the room Name")
})