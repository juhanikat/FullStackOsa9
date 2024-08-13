"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOccupation = exports.parseGender = exports.parseSsn = exports.parseDateOfBirth = exports.parseName = exports.isGender = exports.isString = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
exports.isString = isString;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
exports.isGender = isGender;
const parseName = (name) => {
    if (!isString(name) || name.length == 0) {
        throw new Error("Incorrect name");
    }
    return name;
};
exports.parseName = parseName;
const parseDateOfBirth = (dateOfBirth) => {
    if (!isString(dateOfBirth) ||
        !isDate(dateOfBirth) ||
        dateOfBirth.length == 0) {
        throw new Error("Incorrect date of birth");
    }
    return dateOfBirth;
};
exports.parseDateOfBirth = parseDateOfBirth;
const parseSsn = (ssn) => {
    if (!isString(ssn) || ssn.length == 0) {
        throw new Error("Incorrect ssn");
    }
    return ssn;
};
exports.parseSsn = parseSsn;
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender");
    }
    return gender;
};
exports.parseGender = parseGender;
const parseOccupation = (occupation) => {
    if (!isString(occupation) || occupation.length == 0) {
        throw new Error("Incorrect occupation");
    }
    return occupation;
};
exports.parseOccupation = parseOccupation;
