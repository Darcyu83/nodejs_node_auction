import { INTEGER, Model, STRING, Sequelize } from "sequelize"
import Auction from "./auction"

class User extends Model {
  static initiate(sequelize: Sequelize) {
    User.init(
      {
        email: { type: STRING(40), allowNull: false, unique: true },
        nick: { type: STRING(15), allowNull: false },
        password: { type: STRING(100), allowNull: true },
        money: { type: INTEGER, allowNull: false, defaultValue: 0 },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  }

  static associate() {
    User.hasMany(Auction)
  }
}

export default User
