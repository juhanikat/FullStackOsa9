import { useState, SyntheticEvent, useEffect } from "react";

import { TextField, Input, Select, MenuItem, Button } from "@mui/material";

import {
  HealthCheckRating,
  HealthCheckEntryFormValues,
  Diagnosis,
} from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const NewHealthCheckEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
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
    const type = "HealthCheck";
    onSubmit({
      type,
      description,
      date,
      specialist,
      healthCheckRating,
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
        <div>
          Healthy
          <input
            type="radio"
            name="rating"
            checked
            onChange={() => setHealthCheckRating(0)}
          />
          Low Risk
          <input
            type="radio"
            name="rating"
            onChange={() => setHealthCheckRating(1)}
          />
          High Risk
          <input
            type="radio"
            name="rating"
            onChange={() => setHealthCheckRating(2)}
          />
          Critical Risk
          <input
            type="radio"
            name="rating"
            onChange={() => setHealthCheckRating(3)}
          />
        </div>
        <p>Diagnosis Codes</p>
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

export default NewHealthCheckEntryForm;
