export interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
export interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
export interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  "Hospital" = 0,
  "OccupationalHealthcare" = 1,
  "HealthCheck" = 2,
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type OccupationalHealthcareEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

export type EntryFormValues =
  | HospitalEntryFormValues
  | OccupationalHealthcareEntryFormValues
  | HealthCheckEntryFormValues;
