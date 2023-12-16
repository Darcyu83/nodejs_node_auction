import { Dialect, Sequelize } from "sequelize"

import User from "./user"
import Auction from "./auction"
import Good from "./good"
import { configDotenv } from "dotenv"

configDotenv()

export const Models = {
  User: User,
  Auction: Auction,
  Good: Good,
}

const username = process.env.DB_USER_NAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const host = process.env.DB_HOST
const dialect = process.env.DB_DIALECT

export const initiateModels = () => {
  const sequelize = new Sequelize(database!, username!, password!, {
    database,
    username,
    password,
    dialect: dialect as Dialect,
  })

  console.log(database, username, password, dialect, sequelize.models)

  // 모델 초기화
  Object.keys(Models).forEach((key) => {
    console.log("모델 초기화", key)
    Models[key as keyof typeof Models].initiate(sequelize)
  })

  // 모델 관계 설정
  Object.keys(Models).forEach((key) => {
    console.log("모델 관계 설정", key)
    Models[key as keyof typeof Models].associate()
  })

  Object.keys(sequelize.models).forEach((key) => {
    console.log("model key", key, sequelize.models[key].associations)
  })

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("데이터 베이스 연결 성공")
    })
    .catch((error) => console.log(error))
}
