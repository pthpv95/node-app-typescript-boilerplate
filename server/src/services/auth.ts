import { UserDoc } from "../models/user"
import { sign } from "jsonwebtoken"
import { Response } from "express"

const createAccessToken = (user: UserDoc) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15s",
  })
}

const createRefreshToken = (user: UserDoc) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  )
}

const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rftk", token, {
    httpOnly: true,
  })
}

export { createAccessToken, createRefreshToken, sendRefreshToken }
