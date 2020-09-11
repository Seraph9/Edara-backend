const Validator = require("validator");

function validText(str) {
    return typeof str === "string" && str.trim().length > 0;
};


export function validateLoginInput(data) {
    let errors = {};
    data.username = validText(data.username) ? data.username : "";
    data.password = validText(data.password) ? data.password : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "User Name is Required.";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is Required.";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }

};


