"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const blog_1 = require("./blog");
const subCategory_1 = require("./subCategory");
const user_1 = require("./user");
let Media = class Media extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Media.prototype, "src", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
    }),
    __metadata("design:type", Boolean)
], Media.prototype, "enabled", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Media.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Media.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => subCategory_1.SubCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
    }),
    __metadata("design:type", Number)
], Media.prototype, "subCategoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subCategory_1.SubCategory),
    __metadata("design:type", subCategory_1.SubCategory)
], Media.prototype, "subCategory", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => blog_1.Blog),
    __metadata("design:type", Array)
], Media.prototype, "blogs", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_1.User),
    __metadata("design:type", Array)
], Media.prototype, "users", void 0);
Media = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "media",
    })
], Media);
exports.Media = Media;
