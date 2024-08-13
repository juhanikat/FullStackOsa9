"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send((0, patientService_1.getPatients)());
});
router.post("/", (req, res) => {
    try {
        const addedPatient = (0, patientService_1.addPatient)(req.body);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong!";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = (0, patientService_1.getOnePatient)(id);
    if (patient === undefined) {
        res.status(404).send("No patient found with id " + id);
    }
    res.json(patient);
});
exports.default = router;
