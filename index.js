



import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connecToDb from "./Config/ConnectoDb.js";
import "./Config/Nodemailler.js"; 
import auth from "./Router/Authrouter.js";
import airouter from "./Router/airouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));





app.get("/", (req, res) => res.send("Hello from Node"));
app.use("/api/auth", auth);
app.use("/api/Airouter", airouter);


connecToDb();
app.listen(PORT, () => console.log(`Server running on ✅✅✅ ${PORT}`));

console.log("Uploads path:", path.join(__dirname, "uploads"));
