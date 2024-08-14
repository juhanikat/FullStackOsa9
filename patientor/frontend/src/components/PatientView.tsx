import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { useEffect, useState } from "react";

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

  if (patient !== undefined) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>{patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>Entries</h3>
        <div>
          {patient.entries.map((entry: Entry) => (
            <div>
              <h4>{entry.date}</h4>
              <p>{entry.description}</p>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => (
                  <p>
                    {code} {diagnoses?.find((obj) => obj.code === code)?.name}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PatientView;
