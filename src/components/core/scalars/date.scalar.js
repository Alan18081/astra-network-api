"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("@nestjs/graphql");
var graphql_2 = require("graphql");
var DateScalar = /** @class */ (function () {
    function DateScalar() {
        this.description = 'Date custom scalar type';
    }
    DateScalar.prototype.parseValue = function (value) {
        return new Date(value);
    };
    DateScalar.prototype.serialize = function (value) {
        return value.getTime();
    };
    DateScalar.prototype.parseLiteral = function (ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    };
    DateScalar = __decorate([
        graphql_1.Scalar('Date')
    ], DateScalar);
    return DateScalar;
}());
exports.DateScalar = DateScalar;
