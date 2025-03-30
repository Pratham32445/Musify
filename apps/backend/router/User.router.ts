import express from "express"
import { signUpSchema } from "comman/types"
import prismaClient from "db/client"
import bcryprt from "bcryptjs"

const router = express.Router();

router.post("/sign-up", async (req, res) => {
    const parsedBody = signUpSchema.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(411).json({
            message: "Invalid Inputs"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedBody.data.email
        }
    })
    if (user) {
        res.status(401).json({
            message: "User Already Exist"
        })
        return;
    }
    const hashedPassword = await bcryprt.hash(parsedBody.data.password, 10);
    await prismaClient.user.create({
        data: {
            email: parsedBody.data.email,
            password: hashedPassword,
            firstName: parsedBody.data.firstName
        }
    })
    res.json({
        message: "Created"
    })
})

router.post("/sign-in", (req, res) => {

})

router.post("/get-user", (req, res) => {

})

export { router as UserRouter };