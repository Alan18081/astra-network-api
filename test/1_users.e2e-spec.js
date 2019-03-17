"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var apollo_client_1 = require("./apollo-client");
describe('Users', function () {
    var user = {
        firstName: 'Alex',
        lastName: 'Markus',
        email: 'markus4315@gmail.com',
        password: '123456'
    };
    var token;
    var client;
    var authClient;
    var friendId;
    beforeAll(function () {
        client = apollo_client_1.createClient({});
        process['data'] = { hello: 'Time' };
    });
    it('should create user', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                mutation {\n                  createUser(input: {\n                    firstName: \"", "\",\n                    lastName: \"", "\",\n                    email: \"", "\",\n                    password: \"", "\"\n                  }) {\n                    _id,\n                    firstName,\n                    lastName,\n                    email,\n                  }\n                }\n              "], ["\n                mutation {\n                  createUser(input: {\n                    firstName: \"", "\",\n                    lastName: \"", "\",\n                    email: \"", "\",\n                    password: \"", "\"\n                  }) {\n                    _id,\n                    firstName,\n                    lastName,\n                    email,\n                  }\n                }\n              "])), user.firstName, user.lastName, user.email, user.password)
                    })];
                case 1:
                    result = _a.sent();
                    data = result.data;
                    expect(data.createUser).toBeDefined();
                    expect(typeof data.createUser._id).toBe('string');
                    expect(data.createUser.firstName).toEqual(user.firstName);
                    expect(data.createUser.lastName).toEqual(user.lastName);
                    expect(data.createUser.email).toEqual(user.email);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should login user', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              mutation {\n                  login(input: {\n                      email: \"", "\",\n                      password: \"", "\"\n                  }) {\n                      accessToken,\n                      refreshToken,\n                      expiresIn\n                  }\n              }\n            "], ["\n              mutation {\n                  login(input: {\n                      email: \"", "\",\n                      password: \"", "\"\n                  }) {\n                      accessToken,\n                      refreshToken,\n                      expiresIn\n                  }\n              }\n            "])), user.email, user.password)
                    })];
                case 1:
                    res = _a.sent();
                    data = res.data;
                    expect(data.login).toBeDefined();
                    expect(typeof data.login.accessToken).toBe('string');
                    expect(typeof data.login.refreshToken).toBe('string');
                    expect(typeof data.login.expiresIn).toBe('number');
                    token = data.login.accessToken;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get user profile', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authClient = apollo_client_1.createClient({
                        Authorization: "Bearer " + token
                    });
                    return [4 /*yield*/, authClient.query({
                            query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                query {\n                    profile {\n                        _id\n                        firstName\n                        lastName\n                        email\n                    }\n                }\n            "], ["\n                query {\n                    profile {\n                        _id\n                        firstName\n                        lastName\n                        email\n                    }\n                }\n            "]))),
                        })];
                case 1:
                    res = _a.sent();
                    data = res.data;
                    expect(data.profile).toBeDefined();
                    expect(typeof data.profile._id).toBe('string');
                    expect(data.profile.firstName).toEqual(user.firstName);
                    expect(data.profile.lastName).toEqual(user.lastName);
                    expect(data.profile.email).toEqual(user.email);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return user by id', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockUser, res, id, userInfo, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockUser = {
                        firstName: 'Mark',
                        lastName: 'Cuper',
                        age: 28,
                        email: 'cuper123@gmail.com',
                        password: '123456'
                    };
                    return [4 /*yield*/, client.mutate({
                            mutation: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n                mutation {\n                    createUser(input: {\n                        firstName: \"", "\",\n                        lastName: \"", "\",\n                        email: \"", "\",\n                        password: \"", "\",\n                    }) {\n                        _id,\n                        firstName,\n                        lastName,\n                        email,\n                    }\n                }\n            "], ["\n                mutation {\n                    createUser(input: {\n                        firstName: \"", "\",\n                        lastName: \"", "\",\n                        email: \"", "\",\n                        password: \"", "\",\n                    }) {\n                        _id,\n                        firstName,\n                        lastName,\n                        email,\n                    }\n                }\n            "])), mockUser.firstName, mockUser.lastName, mockUser.email, mockUser.password),
                        })];
                case 1:
                    res = _a.sent();
                    id = res.data.createUser._id;
                    return [4 /*yield*/, authClient.query({
                            query: graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n                query {\n                    user(id: \"", "\") {\n                        _id\n                        firstName\n                        lastName\n                        email\n                        age\n                    }\n                }\n            "], ["\n                query {\n                    user(id: \"", "\") {\n                        _id\n                        firstName\n                        lastName\n                        email\n                        age\n                    }\n                }\n            "])), id),
                        })];
                case 2:
                    userInfo = _a.sent();
                    data = userInfo.data;
                    expect(data.user).toBeDefined();
                    expect(typeof data.user._id).toBe('string');
                    expect(data.user.firstName).toEqual(mockUser.firstName);
                    expect(data.user.lastName).toEqual(mockUser.lastName);
                    expect(data.user.email).toEqual(mockUser.email);
                    friendId = data.user._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update user profile', function () { return __awaiter(_this, void 0, void 0, function () {
        var userData, result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = {
                        firstName: 'Vladimir',
                        lastName: 'Mocscow',
                        age: 30,
                    };
                    return [4 /*yield*/, authClient.mutate({
                            mutation: graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n                mutation {\n                    updateProfile(input: {\n                        firstName: \"", "\",\n                        lastName: \"", "\",\n                        age: ", "\n                    }) {\n                        _id,\n                        firstName,\n                        lastName,\n                        age\n                    }\n                }\n            "], ["\n                mutation {\n                    updateProfile(input: {\n                        firstName: \"", "\",\n                        lastName: \"", "\",\n                        age: ", "\n                    }) {\n                        _id,\n                        firstName,\n                        lastName,\n                        age\n                    }\n                }\n            "])), userData.firstName, userData.lastName, userData.age)
                        })];
                case 1:
                    result = _a.sent();
                    data = result.data;
                    expect(data.updateProfile).toBeDefined();
                    expect(typeof data.updateProfile._id).toBe('string');
                    expect(data.updateProfile.firstName).toEqual(userData.firstName);
                    expect(data.updateProfile.lastName).toEqual(userData.lastName);
                    expect(data.updateProfile.age).toEqual(userData.age);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
