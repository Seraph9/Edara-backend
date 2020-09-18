const asyncHandler = handler => (req, res, next) =>
    handler(req, res, next).catch(next);

const { check, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(error => error.msg);

        const err = Error(errors);
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }

    next();
};

module.exports = { asyncHandler, handleValidationErrors };
