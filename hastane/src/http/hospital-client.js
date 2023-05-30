import { baseClient } from "./base-client";


function getHospitals() {
    return baseClient.get('hospitals');
}

function getPatients() {
    return baseClient.get('patients');
}

function getDepartments() {
    return baseClient.get('departments');
}

function getRecipients() {
    return baseClient.get('recipients');
}

function getDetails() {
    return baseClient.get('details');
}

export { getHospitals, getPatients, getDepartments, getRecipients, getDetails };
