import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";

class CarImages extends Model {}

CarImages.init(
    {
        file_name: {
            type: DataTypes.STRING(150),

            allowNull: false,
            set(value) {
                this.setDataValue("file_name", value.trim());
            },
        },
        originalname: {
            type: DataTypes.STRING(),
            allowNull: false,
            set(value) {
                this.setDataValue("originalname", value.trim());
            },
        },
        car_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        freezeTableName: true,
        sequelize,
        tableName: "car_images",
        timestamps: true,
        updatedAt: false,
    }
);
export default CarImages;
