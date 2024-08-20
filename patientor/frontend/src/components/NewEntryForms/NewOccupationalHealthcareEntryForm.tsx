import { useState, SyntheticEvent, useEffect } from "react";

import { TextField, Input, Button, Select, MenuItem } from "@mui/material";

import { OccupationalHealthcareEntryFormValues, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const NewOccupationalHealthcareEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
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
    const type = "OccupationalHealthcare";
    const sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
    onSubmit({
      type,
      description,
      date,
      specialist,
      employerName,
      sickLeave,
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
        <TextField
          label="Employer Name"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <p>Sick leave from:</p>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />
        <p>To:</p>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        />
        <Select
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(diagnosisCodes.concat(target.value))
          }
        >
          {diagnoses &&
            diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.name}
              </MenuItem>
            ))}
        </Select>
        <br></br>
        <Button variant="contained" type="submit">
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default NewOccupationalHealthcareEntryForm;
