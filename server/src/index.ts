import "dotenv/config"
import express, { Request, Response } from "express"
import cors from "cors"
import "express-async-errors"
import { json } from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import mongoose from "mongoose"
import { User } from "./models/user"
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./services/auth"
import { authorized } from "./services/authorized"
import { errorHandler } from "./services/error-handler"
import { verify } from "jsonwebtoken"
import path from "path"
import { ResponseData } from "./common/response-data"

const indexPath = path.join(__dirname, "./public")
const loginPath = path.join(__dirname, "./public/login.html")

const app = express()
app.set("trust proxy", true)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(json())
// app.use(
//   cookieSession({
//     signed: false,
//   })
// ) //not need now
app.use(compression())
app.use(cookieParser())

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world. Welcome to node app typescript simple boilerplate.")
})

app.post("/api/login", async (req: Request, res: Response) => {
  const body = req.body
  const user = await User.findOne({ email: body.email })
  if (!user) {
    throw new Error("User not found")
  }

  if (user.password !== body.password) {
    throw new Error("Wrong username or password")
  }

  sendRefreshToken(res, createRefreshToken(user))

  res.send(
    new ResponseData(true, {
      accessToken: createAccessToken(user),
      user,
    })
  )
})

app.get("/api/logout", async (req: Request, res: Response) => {
  sendRefreshToken(res, "")
  res.send({})
})

app.post("/api/refresh_token", async (req: Request, res: Response) => {
  const token = req.cookies.rftk
  if (!token) {
    res.send({ ok: false, accessToken: "" })
  }

  let payload: any
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    throw error
  }

  const user = await User.findById(payload.userId)

  if (!user) {
    res.send({
      data: {
        ok: false,
        accessToken: "",
      },
    })
  }

  sendRefreshToken(res, createRefreshToken(user))

  res.send({
    ok: true,
    data: {
      accessToken: createAccessToken(user),
    },
  })
})

app.get("/healthcheck", authorized, async (req: Request, res: Response) => {
  res.status(201).send("App is running")
})

app.get("/api/me", authorized, async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser.userId)
  res.status(201).send(
    new ResponseData(true, {
      user,
    })
  )
})

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(201).send(users)
})

app.post("/api/users", async (req: Request, res: Response) => {
  const body = req.body
  const user = User.build({
    email: body.email,
    password: body.password,
  })

  await user.save()

  res.status(201).send(
    new ResponseData(true, {
      user,
    })
  )
})

app.put("/api/users", authorized, async (req: Request, res: Response) => {
  const body = req.body
  const user = await User.findById(req.currentUser.userId)
  if (!user) {
    throw new Error("User not found")
  }

  user.set({ email: body.email, name: body.name })

  await user.save()

  res.status(201).send(
    new ResponseData(true, {
      user,
    })
  )
})

app.use("/static/login", express.static(loginPath))
app.use("/static/", express.static(indexPath))
app.use(errorHandler)

const start = async () => {
  try {
    // const hostname = process.env.MONGO_HOSTNAME || "127.0.0.1"
    await mongoose.connect(
      `mongodb://hp-my-cosmodb:LvmZjcC9kIeRdeWTlYFgZZo8gE9thbAZK65d9M6xLeFcIwYmWqBlgSOxpF2KciqZpowMC2aPQ1Yi2ow8Ew1bjQ==@hp-my-cosmodb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    console.log("mongodb connected !!!")
  } catch (error) {
    console.log(error)
  }

  app.listen(process.env.PORT || 8080, () => {
    console.log(`app is running!!!!`)
  })
}

start()
