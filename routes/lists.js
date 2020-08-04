const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { List, User, Note } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

const userPermissionError = () => {
    const err = Error('You do not have permission to do this');
    err.title = "User alert.";
    err.status = 404;
    return err;
};

//returns all lists
router.get('/', asyncHandler(async (req, res) => {
    const Lists = await List.findAll();
    res.json(Lists);
}));


//returns all notes in a given list at listId chronologically ordered
router.get('/:listId/notes', asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.listId, 10);
    const listNotes = await List.findAll({
        include: [{
            model: Note, attributes: ["note", "userId", "createdAt"],
            include: [{ model: User, attributes: ["fullName"] }]
        }],
        where: { id: listId },
        order: [[Note, 'createdAt']]
    });

    const [{ Notes }] = listNotes;
    res.json({ Notes });
}));

//creates a new list
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { id, title } = req.body;
    const list = await List.create({ id, title });
    const listUsers = await ListUser.create({ userId, listId: list.dataValues.id });
    const newNote = await Note.create({ note: `I've created note-card: ${name}!`, userId, listId: list.dataValues.id });
    res.status(201).json({ list });
}));

//updates a list name, checks to see if user's id matches with "owner" of list
//userId get passed in from the fetch on front end via local storage
router.put('/:listId', asyncHandler(async (req, res, next) => {
    const { userId, name } = req.body; //userId should be passed into the request
    const listId = parseInt(req.params.listId, 10);
    const list = await List.findByPk(listId);
    if (list && (Number(userId) === list.dataValues.userId)) {
        await list.update({ name });
        res.json({ list });
    } else {
        next(userPermissionError());
    }
}));

//deltes a list, checks to see if user's id matches with "owner" of list
//userId get passed in from the fetch on front end via local storage
router.delete('/:listId', asyncHandler(async (req, res, next) => {
    const { userId } = req.body; //userId should be passed into the request
    const listId = parseInt(req.params.listId, 10);
    const list = await List.findByPk(listId);
    const listUsers = await ListUser.findAll({ where: { listId } });
    const notes = await Note.findAll({ where: { listId } });
    if (list && (Number(userId) === list.dataValues.userId)) {
        for (let note of notes) {
            await note.destroy();
        }

        for (let listUser of listUsers) {
            await listUser.destroy();
        }
        await list.destroy();
        res.status(204).end();
    } else {
        next(userPermissionError());
    }
}));

module.exports = router;