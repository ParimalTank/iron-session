import { setCookie } from "@/lib/cookies";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "../../lib/auth";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const body = JSON.parse(req.body);

                console.log("user details", body);

                // use jose for Encrypt user name and password
                const token = await new SignJWT({
                    username: body.username,
                    password: body.password
                    // role: "admin", // Set your own roles
                })
                    .setProtectedHeader({ alg: "HS256" })            // used HS256  authentication FOR security purposes
                    .setIssuedAt()
                    .setExpirationTime("30m") // Set your own expiration time
                    .sign(getJwtSecretKey()); // Encrypt with our private key

                setCookie(res, 'token', token, { path: '/', maxAge: 2592000 })

                return res.status(200).json({ success: true })
            } catch (error) {
                console.log(error);
                return res.status(200).json({ success: false })
            }
    }
}