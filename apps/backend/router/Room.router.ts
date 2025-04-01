import express from "express"
import { authMiddleware } from "../middleware";
import { createRoomSchema } from "comman/types";
import prismaClient from "db/client"

const router = express.Router();

router.post("/create-room", authMiddleware, async (req, res) => {
    const parsedBody = createRoomSchema.safeParse(req.body);
    if (!parsedBody.success) {
        console.log(parsedBody.error.errors);
        res.status(411).json({
            message: "Invalid Inputs",
            errors: parsedBody.error.errors.reduce((acc, curr) => {
                const newObj = { ...acc,[curr.path[0]]: curr.message }
                acc = newObj;
                return acc
            }, {})
        })
        return;
    }
    await prismaClient.room.create({
        data: {
            Name: parsedBody.data.Name,
            adminId: req.userId!,
        }
    })
    res.json({
        message: "Room Created"
    })
})

export { router as RoomRouter };