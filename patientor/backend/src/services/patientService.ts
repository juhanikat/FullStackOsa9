import patients from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import {
  parseName,
  parseDateOfBirth,
  parseSsn,
  parseGender,
  parseOccupation,
} from "../validations";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const toNewPatient = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    !(
      "name" in object &&
      "dateOfBirth" in object &&
      "ssn" in object &&
      "gender" in object &&
      "occupation" in object
    )
  ) {
    throw new Error("One or more fields are missing from patient");
  }
  const newPatient: Patient = {
    id: uuid(),
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);
  patients.push(newPatient);
  console.log(patients);
  return newPatient;
};

export { getPatients, toNewPatient, addPatient };
