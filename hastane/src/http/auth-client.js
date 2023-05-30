import { baseClient } from "./base-client";

function loginUser(personnelNumber, password) {
    return baseClient.post('signin', {
        personnelNumber,
        password
    });
}

function registerUser(user) {
    return baseClient.post('signup', {
        user
    });
}

export { loginUser, registerUser };