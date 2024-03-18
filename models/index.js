import Features from "./features.model.js";
import images from "./images.model.js"; 
import Projects from "./project.model.js";
import Cars from "./cars.model.js";
import ProjectFeatures from "./project_features.model.js";
import RefreshToken from "./refresh_token.model.js";
import Users from "./user.model.js";
import CarImages from "./carImages.model.js";

// ! role has one to many team user
Projects.hasMany(images, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "ProjectImages",
	foreignKey: "project_id",
});
images.belongsTo(Projects, { foreignKey: "project_id", as: "Project_info" });

Users.hasMany(RefreshToken, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "refreshTokens",
	foreignKey: "u_id",
});
RefreshToken.belongsTo(Users, { foreignKey: "u_id", as: "userInfo" });

Projects.hasMany(ProjectFeatures, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	foreignKey: "project_id",
});
ProjectFeatures.belongsTo(Projects, {
	foreignKey: "project_id",
});

Features.hasMany(ProjectFeatures, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	// foreignKey: "feature_id",
});
ProjectFeatures.belongsTo(Features, {
	// foreignKey: "feature_id",
});

// ! Multi languages

// Projects.hasMany(MultiLanguagesProject, {
// 	constraints: true,
// 	onDelete: "CASCADE",
// 	onUpdate: "CASCADE",
// 	hooks: true,
// 	foreignKey: "project_id",
// });
// MultiLanguagesProject.belongsTo(Projects, {
// 	foreignKey: "project_id",
// });

// Features.hasMany(MultiLanguagesFeatures, {
// 	constraints: true,
// 	onDelete: "CASCADE",
// 	onUpdate: "CASCADE",
// 	hooks: true,
// 	foreignKey: "feature_id",
// });
// MultiLanguagesFeatures.belongsTo(Features, {
// 	foreignKey: "feature_id",
// });

// ! Cars
Cars.hasMany(CarImages, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "images",
	foreignKey: "car_id",
});
CarImages.belongsTo(Cars, { foreignKey: "car_id", as: "car_info" });

// -------------------------------------------------------------------

export {
	RefreshToken,
	Users,
	images,
	Projects,
	ProjectFeatures,
	Features,
	Cars,CarImages
};
