import { useState, SyntheticEvent, useEffect } from "react";

import { TextField, Input, Button, Select, MenuItem } from "@mui/material";

import { HospitalEntryFormValues, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
}

const NewHospitalEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([""]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnoses: Diagnosis[] = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    getDiagnoses();
  }, []);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const type = "Hospital";
    const discharge = { date: dischargeDate, criteria: dischargeCriteria };
    onSubmit({
      type,
      description,
      date,
      specialist,
      discharge,
      diagnosisCodes,
    });
    setDiagnosisCodes([]);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <p>Date</p>
        <Input
          id="date"
          type="date"
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <p>Discharge date:</p>
        <Input
          type="date"
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <br></br>
        <TextField
          label="Discharge Criteria"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <p>Diagnosis Codes</p>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(diagnosisCodes.concat(target.value))
          }
        >
          {diagnoses &&
            diagnoses.map((d) => <MenuItem key={d.code} value={d.code}>{d.name}</MenuItem>)}
        </Select>
        <br></br>
        <Button variant="contained" type="submit">
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default NewHospitalEntryForm;
