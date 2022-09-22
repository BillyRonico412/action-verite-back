"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.get("/verite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uri = "https://api.truthordarebot.xyz/v1/truth";
        if (req.query && (yield utils_1.yupQuery.isValid(req.query))) {
            uri += "rating=" + req.query.rating;
        }
        let resp;
        do {
            resp = yield axios_1.default.get(uri);
        } while (!(yield utils_1.yupVerite.isValid(resp.data)) ||
            !(0, utils_1.isOneSentence)(resp.data.question));
        return res.json(resp.data);
    }
    catch (err) {
        console.log(err);
        return res.status(204);
    }
}));
app.get("/action", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uri = "https://api.truthordarebot.xyz/v1/dare";
        if (req.query && (yield utils_1.yupQuery.isValid(req.query))) {
            uri += "rating=" + req.query.rating;
        }
        let resp;
        do {
            resp = yield axios_1.default.get(uri);
        } while (!(yield utils_1.yupVerite.isValid(resp.data)) ||
            !(0, utils_1.isOneSentence)(resp.data.question));
        return res.json(resp.data);
    }
    catch (err) {
        console.log(err);
        return res.status(204);
    }
}));
app.listen(process.env.PORT, () => {
    console.log("Listen to :" + process.env.PORT);
});
