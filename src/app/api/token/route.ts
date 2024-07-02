import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

type TokenRequestType = {
    token: string;
}

export const POST = async (request: Request) => {
    try {
        const { token }: TokenRequestType = await request.json()
        cookies().set('token', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
        })

        return NextResponse.json({ message: "successfully set the cookie" })
    } catch (error) {
        return NextResponse.json({ message: "error: Failed to set the cookie" })
    }
}


export const GET = async (request: Request) => {
    try {
        const token = cookies().get('token')

        return NextResponse.json({ message: "successfully get the cookie", token: token })
    } catch (error) {
        return NextResponse.json({ message: "error: Failed to get the cookie" })
    }
}


export const DELETE = async (request: Request) => {
    try {
        const token = cookies().delete("token")

        return NextResponse.json({ message: "successfully get the cookie", token: token })
    } catch (error) {
        return NextResponse.json({ message: "error: Failed to get the cookie" })
    }
}