import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/Options";

export async function GET() {
    const session = await getServerSession(authOptions);
    const token = jwt.sign({Id : session?.user.id},process.env.NEXTAUTH_SECRET!);
    return NextResponse.json({token})
}