import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize"; 
class Cars extends Model {}

Cars.init(
	{
		carName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		manufacturingYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		carType: {
			type: DataTypes.ENUM("benzin", "dizel"),
			allowNull: false,
		},
		carPresence: {
			type: DataTypes.ENUM("Sakarya", "Istanbul"),
			allowNull: false,
		},
		rental: { type: DataTypes.JSON, allowNull: false },
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: "cars",
		timestamps: true,
		paranoid: false,
	}
);
export default Cars;
