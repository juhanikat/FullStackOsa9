"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.json({ ping: "pong" });
});
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
