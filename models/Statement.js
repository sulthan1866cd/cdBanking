import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Statement = sequelize.define("statements", {
  transaction_no: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  customer_id:{
    type:DataTypes.STRING,
    allowNull:false
  },
  account:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  closing_balence: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

export default Statement;
