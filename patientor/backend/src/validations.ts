import {
  Gender,
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isHealthCheckRating = (rating: unknown) => {
  console.log(Object.values(HealthCheckRating));
  return (
    isString(rating) &&
    Object.values(HealthCheckRating).includes(Number(rating))
  );
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.length == 0) {
    throw new Error("Incorrect name");
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (
    !isString(dateOfBirth) ||
    !isDate(dateOfBirth) ||
    dateOfBirth.length == 0
  ) {
    throw new Error("Incorrect date of birth");
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.length == 0) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.length == 0) {
    throw new Error("Incorrect occupation");
  }
  return occupation;
};

const parseHospitalEntry = (entry: Entry): HospitalEntry => {
  if (!("discharge" in entry)) {
    throw new Error("Missing discharge field in entry");
  }
  if (!("date" in entry.discharge) || !isString(entry.discharge.date)) {
    throw new Error("Incorrect or missing date field in entry.discharge");
  }
  if (!("criteria" in entry.discharge) || !isString(entry.discharge.criteria)) {
    throw new Error("Incorrect or missing criteria field in entry.discharge");
  }
  return entry;
};

const parseOccupationalHealthcareEntry = (
  entry: Entry
): OccupationalHealthcareEntry => {
  if (!("employerName" in entry) || !isString(entry.employerName)) {
    throw new Error("Missing or incorrect employerName field in entry");
  }
  return entry;
};

const parseHealthCheckEntry = (entry: Entry): HealthCheckEntry => {
  console.log(entry);
  if (
    !("healthCheckRating" in entry) ||
    !isHealthCheckRating(entry.healthCheckRating)
  ) {
    throw new Error("Missing or incorrect healthCheckRating field in entry");
  }
  return entry;
};

const parseEntry = (entry: unknown): Entry => {
  if (typeof entry !== "object" || entry == null) {
    throw new Error("Entry is not an object");
  }
  if (!("type" in entry) || !isString(entry.type)) {
    throw new Error("Incorrect or missing type field in entry");
  }
  if (!("description" in entry) || !isString(entry.description)) {
    throw new Error("Incorrect or missing description field in entry");
  }
  if (!("date" in entry) || !isString(entry.date)) {
    throw new Error("Incorrect or missing date field in entry");
  }
  if (!("specialist" in entry) || !isString(entry.specialist)) {
    throw new Error("Incorrect or missing specialist field in entry");
  }
  if (!("type" in entry) || !isString(entry.type)) {
    throw new Error("Incorrect or missing type field in entry");
  }
  const parsedEntry = entry as Entry;

  if (!("diagnosisCodes" in entry)) {
    parsedEntry.diagnosisCodes = [] as Array<Diagnosis["code"]>;
  }
  switch (parsedEntry.type) {
    case "Hospital":
      return parseHospitalEntry(parsedEntry);
    case "OccupationalHealthcare":
      return parseOccupationalHealthcareEntry(parsedEntry);
    case "HealthCheck":
      return parseHealthCheckEntry(parsedEntry);
    default:
      throw new Error(`Invalid type: ${entry.type}`);
  }
  return parsedEntry;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect entries array");
  }
  entries.forEach((entry) => {
    if (
      typeof entry !== "object" ||
      !("type" in entry) ||
      !isString(entry.type)
    ) {
      throw new Error("Incorrect or missing type field in one or more entries");
    }
    if (
      !["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(
        entry.type as string
      )
    ) {
      throw new Error("Incorrect type field value in one or more entries");
    }
  });
  return entries as Entry[];
};

export {
  isString,
  isGender,
  parseName,
  parseDateOfBirth,
  parseSsn,
  parseGender,
  parseOccupation,
  parseEntry,
  parseEntries,
};
