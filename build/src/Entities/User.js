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
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false, name: 'email', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false, name: 'password' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { nullable: false, name: 'user_active', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "userActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false, name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true, name: 'last_login' }),
    __metadata("design:type", Object)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Role_1.Role, (role) => role.users, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: 'user_role',
        joinColumn: {
            name: 'fk_user_id',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'fk_role_id',
            referencedColumnName: 'roleId'
        }
    }),
    __metadata("design:type", Object)
], User.prototype, "roles", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
