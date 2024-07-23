import express from "express";
import { calculateBmiWeb } from "./bmiCalculatorWeb";
import { calculateExercisesWeb } from "./exerciseCalculatorWeb";
const app = express();
const port = 3000;

app.use(express.json());

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  console.log(height, weight);
  res.send(calculateBmiWeb(height, weight));
});

app.get("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ExerciseRequest = req.body;
  console.log(data);
  if (!data.daily_exercises || !data.target) {
    res.json({ error: "Parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily_exercises: any[] = data.daily_exercises;
  const target = Number(data.target);
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    Number.isNaN(target)
  ) {
    res.json({ error: "Malformatted parameters" });
  }
  const converted_daily_exercises = daily_exercises
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));
  if (converted_daily_exercises.length !== daily_exercises.length) {
    res.json({ error: "Malformatted parameters" });
  }
  res.json(calculateExercisesWeb(converted_daily_exercises, target));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
