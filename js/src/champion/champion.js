"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.ChampionSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    rules: { type: Object, required: true },
    description: String,
    version: String
}, {
    timestamps: true
});
exports.ChampionModel = Mongoose.model('Champion', exports.ChampionSchema);
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/champion/champion.js.map