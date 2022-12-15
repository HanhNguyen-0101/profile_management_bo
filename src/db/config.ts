import { Sequelize } from "sequelize-typescript";
import { Blog } from "../models/blog";
import { Category } from "../models/category";
import { Contact } from "../models/contact";
import { Media } from "../models/media";
import { Organization } from "../models/organization";
import { Project } from "../models/project";
import { Skill } from "../models/skill";
import { SubCategory } from "../models/subCategory";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "123456n@N",
  database: "profile_tcs_database_development",
  logging: false,
  models: [User, Contact, Skill, Category, SubCategory, Organization, Media, Project, Blog],
});

export default connection;
