import { patients } from "../data/patients";
import { NonSensitivePatient, Patient, Entry } from "../types";

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

const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};

const addEntryToPatient = (patient: Patient, entry: Entry) => {
  patient.entries.push(entry);
  return entry;
};

export { getPatients, getOnePatient, addPatient, addEntryToPatient };
