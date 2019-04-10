"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var pagination_dto_1 = require("../../core/dto/pagination.dto");
var gender_enum_1 = require("../../../helpers/enums/gender.enum");
var FindManyUsersListDto = /** @class */ (function (_super) {
    __extends(FindManyUsersListDto, _super);
    function FindManyUsersListDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], FindManyUsersListDto.prototype, "ageFrom", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], FindManyUsersListDto.prototype, "ageTo", void 0);
    __decorate([
        class_validator_1.IsEnum(gender_enum_1.Gender),
        class_validator_1.IsOptional()
    ], FindManyUsersListDto.prototype, "gender", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], FindManyUsersListDto.prototype, "query", void 0);
    return FindManyUsersListDto;
}(pagination_dto_1.PaginationDto));
exports.FindManyUsersListDto = FindManyUsersListDto;
