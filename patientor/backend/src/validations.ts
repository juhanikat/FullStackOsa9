import { Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect entries array");
  }
  entries.forEach((entry) => {
    if (typeof entry !== "object" || !("type" in entry) || !isString(entry.type)) {
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
  parseEntries,
};
