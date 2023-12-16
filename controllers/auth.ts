import { RequestHandler } from "express"
import { Models } from "../models"
import bcrypt from "bcrypt"
import passport from "passport"

export const join: RequestHandler = async (req, res, next) => {
  const { email, nick, password, money } = req.body

  try {
    const exUser = await Models.User.findOne({ where: { email } })
    if (exUser) {
      return res.status(406).json({ message: "이미 가입된 이메일입니다." })
    }

    const hash = await bcrypt.hash(password, 12)
    await Models.User.create({ email, nick, password: hash, money })

    return res.status(201).json({ message: "정상 가입처리되었습니다." })
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  passport.authenticate(
    "local",
    (authError: Error, user: typeof Models.User, info: { message: string }) => {
      if (authError) {
        console.log(authError)
        return next(authError)
      }

      if (!user) {
        return res
          .status(406)
          .json({ message: `존재하지 않는 유저입니다. ${info.message}` })
      }

      return req.login(user, (loginError) => {
        if (loginError) {
          console.log(loginError)
          return next(loginError)
        }

        return res.status(200).json({ message: "정상 로그인 되었습니다." })
      })
    }
  )(req, res, next)
}

export const logout: RequestHandler = async (req, res, next) => {
  req.logout(() => {
    res.status(200).json({ message: "정상 로그아웃되었습니다." })
  })
}
