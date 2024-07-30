import express from "express";
import { getPatients, addPatient } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post("/", (req, res) => {
  try {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
