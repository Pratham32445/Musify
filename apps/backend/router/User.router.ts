import express from "express"
import { signInSchema, signUpSchema } from "comman/types"
import prismaClient from "db/client"
import bcryprt from "bcryptjs"
import jwt from "jsonwebtoken"

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
    const new_user = await prismaClient.user.create({
        data: {
            email: parsedBody.data.email,
            password: hashedPassword,
            firstName: parsedBody.data.firstName
        }
    })
    const token = jwt.sign({Id : new_user.Id},process.env.JWT_SECRET!);
    res.cookie("authToken",token);
    res.json({
        message: "Created"  
    })
})

router.post("/sign-in", async (req, res) => {
    const parsedBody = signInSchema.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(411).json({
            message: "Invalid Inputs",
            error: parsedBody.error
        })
        return;
    }
    const user = await prismaClient.user.findFirst({ where: { email: parsedBody.data.email } })
    if (user) {
        const password = await bcryprt.compare(parsedBody.data.password, user!.password!);
        if (password) {
            res.json({
                message: "Success"
            })
            return;
        }
    }
    const token = jwt.sign({Id : user?.Id},process.env.JWT_SECRET!);
    res.cookie("authToken",token);
    res.status(401).json({
        message: "Email or password is wrong"
    })
})

router.post("/get-user", (req, res) => {

})

export { router as UserRouter };