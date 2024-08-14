import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const PatientView = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id as string;

  useEffect(() => {
    const getPatient = async () => {
      const correctPatient = await patientService.getOne(id);
      setPatient(correctPatient);
    };
    getPatient();
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
              <p>{entry.date}</p>
              <p>{entry.description}</p>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => <p>{code}</p>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PatientView;
