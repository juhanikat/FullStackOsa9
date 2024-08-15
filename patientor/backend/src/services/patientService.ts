import { toNewPatient, patients } from "../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOnePatient = (id: string) => {
  const patient = patients.find((obj) => {
    return obj.id === id;
  });
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patient: Patient, entry: NewEntry) => {
  const entryWithId = entry as Entry;
  entryWithId.id = uuid();
  patient.entries.push(entryWithId);
  return entry;
};

export {
  getPatients,
  getOnePatient,
  toNewPatient,
  addPatient,
  addEntryToPatient,
};
