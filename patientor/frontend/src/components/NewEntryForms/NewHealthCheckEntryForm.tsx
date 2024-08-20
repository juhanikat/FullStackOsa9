import { useState, SyntheticEvent, useEffect } from "react";

import {
  TextField,
  Input,
  Select,
  MenuItem,
  Button,
  Radio,
} from "@mui/material";

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
        <label>Healthy</label>
        <Radio
          checked={healthCheckRating === 0}
          onChange={() => setHealthCheckRating(0)}
          value={0}
          name="rating-buttons"
        />
        <label>Low Risk</label>
        <Radio
          checked={healthCheckRating === 1}
          onChange={() => setHealthCheckRating(1)}
          value={1}
          name="rating-buttons"
        />
        <label>High Risk</label>
        <Radio
          checked={healthCheckRating === 2}
          onChange={() => setHealthCheckRating(2)}
          value={2}
          name="rating-buttons"
        />
        <label>Critical Risk</label>
        <Radio
          checked={healthCheckRating === 3}
          onChange={() => setHealthCheckRating(3)}
          value={3}
          name="rating-buttons"
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
