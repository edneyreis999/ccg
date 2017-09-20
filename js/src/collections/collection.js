"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.CollectionSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    completed: Boolean
}, {
    timestamps: true
});
exports.CollectionModel = Mongoose.model('Collection', exports.CollectionSchema);
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/collections/collection.js.map