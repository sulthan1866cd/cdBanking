import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Saving from "./Saving.js";
import Current from "./Current.js";
import Credit from "./Credit.js";

const User = sequelize.define("users", {
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Saving, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Saving.belongsTo(User);

User.hasOne(Current, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Current.belongsTo(User);

User.hasOne(Credit, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Credit.belongsTo(User);

export default User;
