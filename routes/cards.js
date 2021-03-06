const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");

const db = require("../db/models");
const { Card } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

//Creates a new error object if user is not authorized
const userPermissionError = () => {
    const err = Error('You do not have permission to do this');
    err.title = "User alert.";
    err.status = 404;
    return err;
};

// I have duplicate handler that does the same thing in lists with a different path though
router.get('/cards', asyncHandler(async (req, res) => {
    const cards = await Card.findAll();
    res.json(cards);
}));

//Creates a new card for a particular list
router.post('/lists/:listId/cards', asyncHandler(async (req, res) => {
    const { text } = req.body; // const { card, userId } = req.body;
    const listId = parseInt(req.params.listId, 10);
    const card = await Card.create({ text, listId });
    res.status(201).json({ card });
}));

//Edits a single card
router.put('/cards/:id', asyncHandler(async (req, res, next) => {
    const { userId, card } = req.body;
    const id = parseInt(req.params.id, 10);
    const cardToEdit = await Card.findByPk(id);
    if (cardToEdit && (Number(userId) === cardToEdit.dataValues.userId)) {
        await cardToEdit.update({ card });
        res.json({ cardToEdit });
    } else {
        next(userPermissionError());
    }
}));

//Deletes a single card
router.delete('/cards/:id', asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const id = parseInt(req.params.id, 10);
    const card = await Card.findByPk(id);
    if (card && (Number(userId) === Card.dataValues.userId)) {
        await Card.destroy();
        res.status(204).end();
    } else {
        next(userPermissionError());
    }
}));

module.exports = router;