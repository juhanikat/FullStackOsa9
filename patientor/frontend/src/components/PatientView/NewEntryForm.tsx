import { useState, SyntheticEvent, ChangeEvent } from "react";

import { TextField } from "@mui/material";

import { HealthCheckRating, EntryFormValues } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

// Only healthcheckratingentry atm! check EntryFormValues type when updating
const NewEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([""]);

  const onDiagnosisCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const codes = value.split(",");
      const trimmedCodes = codes.map((code) => code.trim());
      if (trimmedCodes) {
        setDiagnosisCodes(trimmedCodes);
      }
    }
  };

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
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="YYYY-MM-DD"
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

        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
