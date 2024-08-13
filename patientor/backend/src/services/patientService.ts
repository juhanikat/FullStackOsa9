import { toNewPatient, patients } from "../data/patients";
import { NonSensitivePatient, Patient, NewPatient } from "../types";

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

export { getPatients, getOnePatient, toNewPatient, addPatient };
