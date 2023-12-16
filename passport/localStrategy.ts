import passport from "passport"
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy } from "passport-local"
import { Models } from "../models"

export default function useLocalStrategy() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const exUser = await Models.User.findOne({ where: { email } })

          if (exUser) {
            const result = await bcrypt.compare(password, exUser.get().password)

            if (result) {
              done(null, exUser)
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." })
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." })
          }
        } catch (error) {
          console.log(error)
          done(error)
        }
      }
    )
  )
}
