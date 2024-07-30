import express from "express";
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.json({ ping: "pong" });
});

app.use("/api/diagnoses", diagnosisRouter);

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
