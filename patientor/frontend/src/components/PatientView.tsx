import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { useEffect, useState } from "react";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import { v4 as uuid } from "uuid";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry: ${value}`);
};

const getCorrectEntryType = (entry: Entry, diagnoses: Diagnosis[]) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientView = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const id = useParams().id as string;

  useEffect(() => {
    const getPatient = async () => {
      const correctPatient = await patientService.getOne(id);
      setPatient(correctPatient);
    };
    const getDiagnoses = async () => {
      const diagnoses: Diagnosis[] = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    getPatient();
    getDiagnoses();
  }, []);

  if (!diagnoses) {
    return <p>Can't find diagnoses</p>;
  }

  if (patient !== undefined) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>Sex: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <h3>Entries</h3>
        <div>
          {patient.entries.map((entry: Entry) => (
            <div key={uuid()}>{getCorrectEntryType(entry, diagnoses)}</div>
          ))}
        </div>
      </div>
    );
  }
};

export default PatientView;
