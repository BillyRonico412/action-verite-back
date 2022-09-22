import express from "express";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { isOneSentence, VeriteInterface, yupQuery, yupVerite } from "./utils";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/verite", async (req, res) => {
    try {
        let uri = "https://api.truthordarebot.xyz/v1/truth";
        if (req.query && (await yupQuery.isValid(req.query))) {
            uri += "rating=" + req.query.rating;
        }
        let resp: AxiosResponse;
        do {
            resp = await axios.get(uri);
        } while (
            !(await yupVerite.isValid(resp.data)) ||
            !isOneSentence((resp.data as VeriteInterface).question)
        );
        return res.json(resp.data);
    } catch (err) {
        console.log(err);
        return res.status(204);
    }
});

app.get("/action", async (req, res) => {
    try {
        let uri = "https://api.truthordarebot.xyz/v1/dare";
        if (req.query && (await yupQuery.isValid(req.query))) {
            uri += "rating=" + req.query.rating;
        }
        let resp: AxiosResponse;
        do {
            resp = await axios.get(uri);
        } while (
            !(await yupVerite.isValid(resp.data)) ||
            !isOneSentence((resp.data as VeriteInterface).question)
        );
        return res.json(resp.data);
    } catch (err) {
        console.log(err);
        return res.status(204);
    }
});

app.listen(process.env.PORT, () => {
    console.log("Listen to :" + process.env.PORT);
});
