import passport from "passport"
import useLocalStrategy from "./localStrategy"
import { Models } from "../models"

export default function initPassport() {
  passport.serializeUser((user, done) => {
    console.log("serializeUser ", user)
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    Models.User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err))
  })

  useLocalStrategy()
}
