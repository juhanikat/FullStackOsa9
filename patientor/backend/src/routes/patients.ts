import express from "express";
import {
  getPatients,
  addPatient,
  getOnePatient,
  addEntryToPatient,
} from "../services/patientService";
import { NewEntry, NewPatient } from "../types";
import { parseEntry } from "../validations";

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

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patient = getOnePatient(id);
  if (patient === undefined) {
    res.status(404).send("No patient found with id " + id);
    return;
  }
  try {
    const newEntry = parseEntry(req.body as NewEntry);
    addEntryToPatient(patient, newEntry);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
