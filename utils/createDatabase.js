import dotenv from "dotenv";
dotenv.config({ path: `.env` });
import { Sequelize } from "sequelize";
import { sequelize as sequelizeConnect } from "../utils/connect.js";

import { addToCache } from "../middleware/cache.js";
import role from "../models/role.model.js";

let setRoleAndRestrictionCache = async () => {
    let allRole = await role.findAll({ raw: true });

    allRole.forEach((roleInfo) => {
        addToCache(roleInfo.id, {
            id: roleInfo.id,
            name: roleInfo.name,
            data: roleInfo.data,
        });
    });
};
export default async () => {
    let connectionUrl = `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT_DB}`;
    const sequelize = new Sequelize(connectionUrl, {
        dialect: "mysql",
        logging: false,
    });
    // ! create database if not exists
    let resultCreate = await sequelize.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`
    );
    // console.log(resultCreate);
    if (resultCreate[0].affectedRows)
        console.log("successfully check database ✅");

    //! check if found table with relationship
    let check = null;
    try {
        check = await sequelize.query(
            `select * from  ${process.env.DATABASE}.user limit 1`
        );
        await setRoleAndRestrictionCache();
    } catch (error) {
        if (!check) {
            // ! if not found user table then create table with relationship
            await import(`../models/index.js`);
            sequelizeConnect
                .sync({ force: true })
                .then(async () => {
                    let defaultData = await import("./default_data.js");
                    await defaultData.default().then((_) => {
                        console.log(
                            "successfully created relationships with tables ✅✅"
                        );
                    });
                    await setRoleAndRestrictionCache();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
