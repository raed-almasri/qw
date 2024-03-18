import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { enumPayments } from "../utils/enums.js";

class Projects extends Model {}

Projects.init(
	{
		projectName: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		description: { type: DataTypes.JSON, required: true },
		city: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		area: {
			type: DataTypes.JSON,
			allowNull: false,
		},
        
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},

		propertyType: {
			type: DataTypes.ENUM("apartment", "villa", "house", "land"),
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("available", "sold", "deleted"),
			allowNull: false,
		},
		suitableForTurkishCitizenship: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		numberOfRooms: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		paymentMethods: {
			type: DataTypes.ENUM,
			values: Object.values(enumPayments),
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: "projects",
		timestamps: true,
		paranoid: false,
	}
);
export default Projects;
