import { INTEGER, Model, STRING, Sequelize } from "sequelize"
import User from "./user"
import Good from "./good"

class Auction extends Model {
  static initiate(sequelize: Sequelize) {
    Auction.init(
      {
        bid: { type: INTEGER, allowNull: false, defaultValue: 0 },
        msg: { type: STRING(100), allowNull: true },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Auction",
        tableName: "auctions",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  }

  static associate() {
    Auction.belongsTo(User)
    Auction.belongsTo(Good)
  }
}

export default Auction
