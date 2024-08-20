import { useParams } from "react-router-dom";
import {
  Patient,
  Entry,
  Diagnosis,
  EntryFormValues,
  EntryType,
} from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import HealthCheckEntry from "../HealthCheckEntry";
import HospitalEntry from "../HospitalEntry";
import OccupationalHealthcareEntry from "../OccupationalHealthcareEntry";
import { v4 as uuid } from "uuid";
import axios from "axios";
import NewHospitalEntryForm from "../NewEntryForms/NewHospitalEntryForm";
import NewHealthCheckEntryForm from "../NewEntryForms/NewHealthCheckEntryForm";
import NewOccupationalHealthcareEntryForm from "../NewEntryForms/NewOccupationalHealthcareEntryForm";
import { Alert, Select, MenuItem, Box } from "@mui/material";

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
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>();
  const [newEntryFormType, setnewEntryFormType] = useState<EntryType>(0);

  const id = useParams().id as string;

  useEffect(() => {
    const getPatient = async () => {
      const correctPatient = await patientService.getOne(id);
      setPatient(correctPatient);
      setEntries(correctPatient.entries);
    };
    const getDiagnoses = async () => {
      const diagnoses: Diagnosis[] = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    getPatient();
    getDiagnoses();
  }, []);

  const submitnewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(id, values);
      setEntries(entries.concat(entry));
      setError("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!diagnoses) {
    return <p>Can't find diagnoses</p>;
  }

  if (patient === undefined) {
    return <p>Can't find patient</p>;
  }

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h2>New Entry</h2>
      <Box
        sx={{
          border: "2px solid #000", // Set the border size and color
          borderRadius: "8px", // Optional: Add rounded corners
          padding: "16px", // Optional: Add padding inside the border
        }}
      >
        <Select
          value={newEntryFormType}
          onChange={({ target }) => setnewEntryFormType(target.value as number)}
        >
          <MenuItem selected={newEntryFormType === 0} key={0} value={0}>
            Hospital Entry
          </MenuItem>
          <MenuItem selected={newEntryFormType === 1} key={1} value={1}>
            Occupational Healthcare Entry
          </MenuItem>
          <MenuItem selected={newEntryFormType === 2} key={2} value={2}>
            Health Check Entry
          </MenuItem>
        </Select>
        {newEntryFormType === 0 && (
          <NewHospitalEntryForm onSubmit={submitnewEntry} />
        )}
        {newEntryFormType === 1 && (
          <NewOccupationalHealthcareEntryForm onSubmit={submitnewEntry} />
        )}
        {newEntryFormType === 2 && (
          <NewHealthCheckEntryForm onSubmit={submitnewEntry} />
        )}
      </Box>
      <h2>{patient.name}</h2>
      <p>Sex: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <div>
        {entries &&
          entries.map((entry: Entry) => (
            <div key={uuid()}>{getCorrectEntryType(entry, diagnoses)}</div>
          ))}
      </div>
    </div>
  );
};

export default PatientView;
