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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const media_1 = require("./media");
const subCategory_1 = require("./subCategory");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 100],
            isEmail: true,
        },
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => media_1.Media),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
    }),
    __metadata("design:type", Number)
], User.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => media_1.Media),
    __metadata("design:type", media_1.Media)
], User.prototype, "avatarObj", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => subCategory_1.SubCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
    }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subCategory_1.SubCategory, "status"),
    __metadata("design:type", subCategory_1.SubCategory)
], User.prototype, "statusObj", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => subCategory_1.SubCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
    }),
    __metadata("design:type", Number)
], User.prototype, "resetPasswordStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subCategory_1.SubCategory, "resetPasswordStatus"),
    __metadata("design:type", subCategory_1.SubCategory)
], User.prototype, "resetPasswordStatusObj", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "user",
    })
], User);
exports.User = User;
