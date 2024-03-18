import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Features extends Model {}

Features.init(
    {
        name: { type: DataTypes.JSON, allowNull: false },
        description: {
            allowNull: true,
            type: DataTypes.JSON
        },
    },
    {
        sequelize,
        tableName: "features",
        freezeTableName: true,
        timestamps: true,
        paranoid: false,
        updatedAt: false,
    }
);
export default Features;
