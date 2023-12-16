import express, { ErrorRequestHandler } from "express"
import { Dialect, Sequelize } from "sequelize"
import User from "./models/user"
import Auction from "./models/auction"
import Good from "./models/good"
import { Models, initiateModels } from "./models"
import initPassport from "./passport"
import { configDotenv } from "dotenv"
import session from "express-session"
import morgan from "morgan"
import path from "path"
import cookieParser from "cookie-parser"
import passport from "passport"

configDotenv()
const app = express()

// db connection + model init
initiateModels()

// passport init
initPassport()

app.set("port", process.env.PORT || 8010)

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

app.use("/img", express.static(path.join(__dirname, "uploads")))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser(process.env.COOKIE_SECRET!))

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

// app.use("/")
// app.use("/auth")

app.use((req, res, next) => {
  const error = new Error(`${req?.method} ${req?.url} 라우터가 없습니다.`)

  next(error)
})

const handleGlobalError: ErrorRequestHandler = (err: Error, req, res, next) => {
  res.status(400).json({ message: `${err.message}` })
}

app.use(handleGlobalError)

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중")
})
