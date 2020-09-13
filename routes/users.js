const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");


const { getUserToken, requireAuth } = require("../auth");
//Imports database models
const db = require("../db/models");
const { User, ListUser } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

const userNotFoundError = id => {
    const err = Error(`User with id of ${id} could not be found.`);
    err.title = "User not found.";
    err.status = 404;
    return err;
};

// validatePassword function
// function validatePassword() {

// };


//Checks to see if a fullName is provided
const validateFullName = check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a full-name");

//Checks to see if email and password are provided
const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password.")
];

//Sends back the fullName & email of a particular user
router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        const { fullName, email } = user;
        res.json({ fullName, email });
    } else {
        next(userNotFoundError(userId))
    }
}));

//Creates a new user and sends back a 201 status, along with the access_token
//and user_id
router.post(
    "/",
    validateFullName,
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const { fullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, hashedPassword });
        await ListUser.create({ userId: user.dataValues.id, listId: 1 })
        const token = getUserToken(user);
        res.status(201).json({
            user: { id: user.id },
            token
        });
    })
);

//Given a particular user's email and password, checks to see if the credentials
//match what is stored in the database
router.post("/token", validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email,
        },
    });

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

    if (!user || !passwordMatch) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id, name: user.fullName } });
}));

//Update a user's fullName and/or email
router.put('/:id(\\d+)', handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { fullName,
        email,
    } = req.body;

    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        await user.update({ fullName, email });
        res.json(user);
    } else {
        next(userNotFound(userId));
    }
}));

//Delete a user's account
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        await user.destroy();
        res.status(204).end();
    } else {
        next(userNotFoundError(userId));
    }
}));

module.exports = router;