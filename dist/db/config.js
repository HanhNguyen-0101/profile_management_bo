"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const blog_1 = require("../models/blog");
const category_1 = require("../models/category");
const contact_1 = require("../models/contact");
const media_1 = require("../models/media");
const organization_1 = require("../models/organization");
const project_1 = require("../models/project");
const skill_1 = require("../models/skill");
const subCategory_1 = require("../models/subCategory");
const user_1 = require("../models/user");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "123456n@N",
    database: "profile_tcs_database_development",
    logging: false,
    models: [user_1.User, contact_1.Contact, skill_1.Skill, category_1.Category, subCategory_1.SubCategory, organization_1.Organization, media_1.Media, project_1.Project, blog_1.Blog],
});
exports.default = connection;
