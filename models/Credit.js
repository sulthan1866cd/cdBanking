import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Credit = sequelize.define("credits", {
  credit_card_no: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
  },
  balence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Credit;
