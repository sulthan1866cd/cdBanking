import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Current = sequelize.define("currents", {
  current_acc_no: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
  },
  balence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ifsc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Current;
