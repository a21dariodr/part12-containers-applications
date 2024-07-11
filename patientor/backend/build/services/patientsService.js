"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid = __importStar(require("uuid"));
const getPatientsWithoutSsn = () => {
    return patients_1.default.map(patient => {
        const modifiedPatient = {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        };
        return modifiedPatient;
    });
};
const getPatient = (id) => {
    return patients_1.default.find(p => p.id === id);
};
const addPatient = (patient) => {
    const id = uuid.v1();
    const addedPatient = Object.assign({ id }, patient);
    patients_1.default.push(addedPatient);
    return addedPatient;
};
const addEntry = (entry, patientId) => {
    const id = uuid.v1();
    const newEntry = Object.assign({ id }, entry);
    const patient = patients_1.default.find(p => p.id === patientId);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    addEntry,
    addPatient,
    getPatientsWithoutSsn,
    getPatient,
};
