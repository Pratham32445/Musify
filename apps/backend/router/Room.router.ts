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
        roomId: room.Id,
        message: "Room Created"
    })
})

router.get("/get-rooms", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const userAsAdminRooms = await prismaClient.room.findMany({
        where: {
            adminId: userId!
        }
    })
    const userRooms = await prismaClient.user.findFirst({
        where: {
            Id: userId!
        },
        select: {
            ownedRooms: true,
            subscribedRooms: true
        }
    })

    const rooms = [...userAsAdminRooms];
    if (userRooms && userRooms.subscribedRooms) rooms.push(...userRooms.subscribedRooms);

    res.json({
        rooms
    })
})

router.post("/joinRoom", authMiddleware, async (req, res) => {
    const roomId = req.body.roomId;
    const room = await prismaClient.room.findFirst({
        where: {
            Id: roomId
        },
        select: {
            subscribers: true
        }
    })
    if (!room) {
        res.status(404).json({
            message: "Room not found"
        })
        return;
    }
    const isFound = room?.subscribers.find((subscriber) => subscriber.Id == req.userId);
    if (isFound) {
        res.status(401).json({
            message: "You are Already Member of this group"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            Id: req.userId
        }
    })
    await prismaClient.user.update({
        where: {
            Id: req.userId
        },
        data: {
            subscribedRooms: {
                connect: {
                    Id: roomId
                }
            }
        }
    })
    res.json({
        message: "Joined Successfully"
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

router.get("/get-songs/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const songs = await prismaClient.room.findFirst({
        where: {
            Id: roomId
        },
        select: {
            lastPlayed: true
        }
    })
    res.json({
        songs
    })
})

export { router as RoomRouter };