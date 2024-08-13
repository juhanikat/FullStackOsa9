import { useParams } from "react-router-dom";
import { Patient } from "../types";
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
      </div>
    );
  }
};

export default PatientView;
