import { OccupationalHealthcareEntryProps } from "../types";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";

const OccupationalHealthcareEntry = (
  props: OccupationalHealthcareEntryProps
) => {
  const entry = props.entry;
  const diagnoses = props.diagnoses;
  return (
    <Box
      sx={{
        border: "2px solid #000", // Set the border size and color
        borderRadius: "8px", // Optional: Add rounded corners
        padding: "16px", // Optional: Add padding inside the border
      }}
    >
      <h4>{entry.date}</h4>
      <p>{entry.description}</p>
      {entry.sickLeave && (
        <p>
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
      <p>Diagnosed by {entry.specialist}</p>
      {entry.diagnosisCodes && <h4>Diagnoses</h4>}
      {entry.diagnosisCodes?.map((code) => (
        <p key={uuid()}>
          {code} {diagnoses.find((obj) => obj.code === code)?.name}
        </p>
      ))}
    </Box>
  );
};

export default OccupationalHealthcareEntry;
