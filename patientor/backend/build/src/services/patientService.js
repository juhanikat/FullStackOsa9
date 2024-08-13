"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.toNewPatient = exports.getOnePatient = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const validations_1 = require("../validations");
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getPatients = getPatients;
const getOnePatient = (id) => {
    const patient = patients_1.default.find((obj) => {
        return obj.id === id;
    });
    return patient;
};
exports.getOnePatient = getOnePatient;
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (!("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object)) {
        throw new Error("One or more fields are missing from patient");
    }
    const newPatient = {
        id: (0, uuid_1.v1)(),
        name: (0, validations_1.parseName)(object.name),
        dateOfBirth: (0, validations_1.parseDateOfBirth)(object.dateOfBirth),
        ssn: (0, validations_1.parseSsn)(object.ssn),
        gender: (0, validations_1.parseGender)(object.gender),
        occupation: (0, validations_1.parseOccupation)(object.occupation),
        entries: []
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
const addPatient = (patient) => {
    const newPatient = toNewPatient(patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
