import { DataTypes, Model } from "sequelize";
import type {  CreationOptional,  InferAttributes,  InferCreationAttributes } from "sequelize";
import { sequelize } from "../../../config/index.js";

export class Account extends Model<  InferAttributes<Account>,  InferCreationAttributes<Account> > {
  declare id_account: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare password: string;
  declare status_account: "pending" | "active" | "suspended" | "deleted";
  declare is_banned: boolean;
  declare is_restricted: boolean;
  declare is_email_verified: boolean;
  declare is_phone_verified: boolean;
  declare created_at: CreationOptional<Date>;
  declare last_updated: CreationOptional<Date>;
  declare last_login_at: CreationOptional<Date | null>;
  declare reputation: number;
}

Account.init(
  {
    id_account: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status_account: {
      type: DataTypes.ENUM("pending", "active", "suspended", "deleted"),
      allowNull: false,
      defaultValue: "pending",
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_restricted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "account",
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ["username", "email"] }],
  }
);
