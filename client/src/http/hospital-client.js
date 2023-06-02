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
function getMR() {
    return baseClient.get('MR');
}

function insertOrUpdateHospital(hospital) {
    return hospital.id ?
        baseClient.patch(`hospitals/${hospital.id}`, { ...hospital }) :
        baseClient.post('hospitals', { ...hospital });
}

function insertOrUpdatePatient(patient) {
    return patient.id ?
        baseClient.patch(`patients/${patient.id}`, { ...patient }) :
        baseClient.post('patients', { ...patient });

}


function deleteHospital(id) {
    return baseClient.delete(`hospitals/${id}`);
}

export { getHospitals, getPatients, getDepartments, getRecipients, getDetails, insertOrUpdateHospital, insertOrUpdatePatient, getMR, deleteHospital };
