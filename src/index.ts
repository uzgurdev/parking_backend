import express from "express";
import cors from "cors";
import config from "./config";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
config(app);
