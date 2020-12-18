import { UserDoc } from "../models/user"
import { sign } from "jsonwebtoken"
import { Request } from "express"

const createAccessToken = (user: UserDoc) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
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

const sendRefreshToken = (req: Request, token: string) => {
  req.session = {
    rftk: token,
  }
}

export { createAccessToken, createRefreshToken, sendRefreshToken }
