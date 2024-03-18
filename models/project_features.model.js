import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class ProjectFeatures extends Model {}

ProjectFeatures.init(
    {
        project_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        tableName: "project_features",
        freezeTableName: true,
        timestamps: false,
        updatedAt: false,
    }
);
export default ProjectFeatures;
