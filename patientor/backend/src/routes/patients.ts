import express from "express";
import {
  getPatients,
  addPatient,
  getOnePatient,
} from "../services/patientService";
import { NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post("/", (req, res) => {
  try {
    const addedPatient = addPatient(req.body as NewPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = getOnePatient(id);
  if (patient === undefined) {
    res.status(404).send("No patient found with id " + id);
  }
  res.json(patient);
});

export default router;
