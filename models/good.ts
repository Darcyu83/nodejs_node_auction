import { INTEGER, Model, STRING, Sequelize } from "sequelize"
import User from "./user"
import Auction from "./auction"

class Good extends Model {
  static initiate(sequelize: Sequelize) {
    Good.init(
      {
        name: { type: STRING(40), allowNull: false },
        img: { type: STRING(200), allowNull: true },
        price: { type: INTEGER, allowNull: false, defaultValue: 0 },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Good",
        tableName: "goods",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  }

  static associate() {
    Good.belongsTo(User, { as: "Owner" })
    Good.belongsTo(User, { as: "Sold" })
    Good.hasMany(Auction)
  }
}

export default Good
