import express from "express";
import { calculateBmiWeb } from "./bmiCalculatorWeb";
const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  console.log(height, weight);
  res.send(calculateBmiWeb(height, weight));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
