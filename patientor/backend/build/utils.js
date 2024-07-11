"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.toNewEntry = exports.toNewPatient = void 0;
const patientsTypes_1 = require("./types/patientsTypes");
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object &&
        'occupation' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatient = toNewPatient;
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        const baseEntry = 'diagnosisCodes' in object
            ? {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
            } : {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
        };
        switch (object.type) {
            case "HealthCheck":
                if (!('healthCheckRating' in object))
                    throw new Error("Health check rating missing");
                const newHealthCheck = Object.assign(Object.assign({}, baseEntry), { type: "HealthCheck", healthCheckRating: parseRating(object.healthCheckRating) });
                return newHealthCheck;
            case "OccupationalHealthcare":
                if (!('employerName' in object))
                    throw new Error("Employer name missing");
                const newOccupationalEntry = Object.assign(Object.assign({}, baseEntry), { type: "OccupationalHealthcare", employerName: parseEmployerName(object.employerName) });
                if ('sickLeave' in object)
                    newOccupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
                return newOccupationalEntry;
            case "Hospital":
                if (!('discharge' in object))
                    throw new Error("Health check rating missing");
                const newHospitalEntry = Object.assign(Object.assign({}, baseEntry), { type: "Hospital", discharge: parseDischarge(object.discharge) });
                return newHospitalEntry;
            default:
                throw new Error("Please provide a valid entry type");
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewEntry = toNewEntry;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(patientsTypes_1.Gender).map(gender => gender.toString())
        .includes(gender);
};
const parseName = (name) => {
    if (!(0, exports.isString)(name))
        throw new Error('Incorrect or missing name ' + name);
    return name;
};
const parseDate = (date) => {
    if (!(0, exports.isString)(date) || !isDate(date))
        throw new Error('Incorrect or missing date of birth ' + date);
    return date;
};
const parseSsn = (ssn) => {
    if (!(0, exports.isString)(ssn))
        throw new Error('Incorrect or missing ssn ' + ssn);
    return ssn;
};
const parseGender = (gender) => {
    if (!(0, exports.isString)(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender ' + gender);
    return gender;
};
const parseOccupation = (occupation) => {
    if (!(0, exports.isString)(occupation))
        throw new Error('Incorrect or missing occupation ' + occupation);
    return occupation;
};
const parseDescription = (description) => {
    if (!(0, exports.isString)(description)) {
        throw new Error('Incorrect or missing description ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!(0, exports.isString)(specialist)) {
        throw new Error('Incorrect or missing description ' + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const isRating = (param) => {
    if (![0, 1, 2, 3].includes(Number(param)))
        return false;
    return true;
};
const parseRating = (rating) => {
    if (!rating || !isRating(rating)) {
        throw new Error('HealthCheckRating missing or incorrect value ' + rating);
    }
    return rating;
};
const parseEmployerName = (employer) => {
    if (!employer || !(0, exports.isString)(employer)) {
        throw new Error('Employer missing or incorrect ' + employer);
    }
    return employer;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error("Sick leave mus be provided.");
    }
    if (!('startDate' in sickLeave) ||
        !('endDate' in sickLeave) ||
        !(0, exports.isString)(sickLeave.startDate) ||
        !isDate(sickLeave.startDate) ||
        !(0, exports.isString)(sickLeave.endDate) ||
        !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect sick leave');
    }
    return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== 'object') {
        throw new Error("Discharge mus be provided.");
    }
    if (!('date' in discharge) ||
        !('criteria' in discharge) ||
        !(0, exports.isString)(discharge.date) ||
        !isDate(discharge.date) ||
        !(0, exports.isString)(discharge.criteria)) {
        throw new Error('Incorrect discharge');
    }
    return { date: discharge.date, criteria: discharge.criteria };
};
