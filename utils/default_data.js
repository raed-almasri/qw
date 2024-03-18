import { Features, Users } from "../models/index.js"; 
import { enumRoles } from "./enums.js"; 
let features = [
	{
		name: {
			ar: "يطل على البحر الأسود",
			en: "Overlooking the Black Sea",
			tr: "Karadeniz'e Manzaralı",
		},
		description: {
			ar: "شقة فيو مميز على شاطئ البحر الأسود",
			en: "Apartment with a distinctive view on the Black Sea shore",
			tr: "Karadeniz kıyısında benzersiz manzaralı daire",
		},
	},
	{
		name: {
			ar: "مدخنة للشواء",
			en: "BBQ Area",
			tr: "Mangal Alanı",
		},
		description: {
			ar: "منطقة مخصصة للشواء في الحديقة",
			en: "Designated barbecue area in the garden",
			tr: "Bahçedeki özel mangal alanı",
		},
	},
	{
		name: {
			ar: "مدخنة للشواء",
			en: "Private Pool",
			tr: "Özel Yüzme Havuzu",
		},
		description: {
			ar: "منطقة مخصصة للشواء في الحديقة",
			en: "The project features a private pool for the residents",
			tr: "Proje, sakinler için özel bir yüzme havuzu sunmaktadır",
		},
	},
	{
		name: {
			ar: "ملاعب رياضية",
			en: "Panoramic City View",
			tr: "Panoramik Şehir Manzarası",
		},
		description: {
			ar: "توفر المشروع ملاعب لمختلف الألعاب الرياضية",
			en: "The units feature breathtaking views of the city",
			tr: "Üniteler, şehrin nefes kesen manzaralarına sahiptir",
		},
	},
];

export default async () => {
	await Features.bulkCreate(features); 
	await Users.create({
		name: "admin 1",
		user_name: "admin_1",
		password: "Test@1234",
		role: enumRoles.Admin,
	});
	await Users.create({
		name: "admin 2",
		user_name: "admin_2",
		password: "Test@1234",
		role: enumRoles.Admin,
	});
	await Users.create({
		name: "developer",
		user_name: "dev",
		password: "Test@1234Dev",
		role: enumRoles.Dev,
	});
};
