const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");

const db = require("../db/models");
const { List, User, Note, ListUser } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

//Creates a new error object if user is not authorized
const userPermissionError = () => {
    const err = Error('You do not have permission to do this');
    err.title = "User alert.";
    err.status = 404;
    return err;
};

//Creates a new note for a particular list
router.post('/lists/:listId/notes', asyncHandler(async (req, res) => {
    const { text, userId } = req.body;
    const listId = parseInt(req.params.listId, 10);
    const newNote = await Note.create({ text, userId: Number(userId), listId });
    res.status(201).json({ newNote });
}));

//Edits a single note
router.put('/notes/:id', asyncHandler(async (req, res, next) => {
    const { userId, note } = req.body;
    const id = parseInt(req.params.id, 10);
    const noteToEdit = await Note.findByPk(id);
    if (noteToEdit && (Number(userId) === noteToEdit.dataValues.userId)) {
        await noteToEdit.update({ note });
        res.json({ noteToEdit });
    } else {
        next(userPermissionError());
    }
}));

//Deletes a single note
router.delete('/notes/:id', asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const id = parseInt(req.params.id, 10);
    const note = await Note.findByPk(id);
    if (note && (Number(userId) === note.dataValues.userId)) {
        await note.destroy();
        res.status(204).end();
    } else {
        next(userPermissionError());
    }
}));

module.exports = router;