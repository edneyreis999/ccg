"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.CardSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    rules: { type: Object, required: true },
    description: String,
    version: String
}, {
    timestamps: true
});
exports.CardModel = Mongoose.model('Card', exports.CardSchema);
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/card/card.js.map