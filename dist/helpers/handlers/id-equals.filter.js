"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.idEqualsFilter = (id, resolverFn) => {
    return graphql_subscriptions_1.withFilter(resolverFn, (payload) => {
        console.log(payload, id);
        return payload._id === id;
    });
};
//# sourceMappingURL=id-equals.filter.js.map