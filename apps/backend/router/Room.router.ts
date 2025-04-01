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
                const newObj = { ...acc, [curr.path[0]]: curr.message }
                acc = newObj;
                return acc
            }, {})
        })
        return;
    }
    const room = await prismaClient.room.create({
        data: {
            Name: parsedBody.data.Name,
            adminId: req.userId!,
        }
    })
    res.json({
        roomId : room.Id,
        message: "Room Created"
    })
})

router.get("/isValid-room/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    const room = await prismaClient.room.findFirst({
        where: { Id: roomId }
    })
    if (!room) {
        res.status(404).json({
            message: "Room Not Found"
        });
        return;
    }
    res.json({
        message: "Success"
    })
})

export { router as RoomRouter };