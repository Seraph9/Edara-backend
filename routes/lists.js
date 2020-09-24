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

const validateList = [
    check("userId")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for userId."),
    check("title")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for title."),
    handleValidationErrors
];

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
router.post('/', validateList, asyncHandler(async (req, res) => {
    let { userId, title } = req.body;
    userId = parseInt(userId, 10);
    const list = await List.create({ userId, title });
    // const listUsers = await ListUser.create({ userId, listId: list.dataValues.id });
    // const newNote = await Note.create({ note: `I've created note-card: ${name}!`, userId, listId: list.dataValues.id });
    res.status(201).json({ list });
}));

//updates a list name, checks to see if user's id matches with "owner" of list
//userId get passed in from the fetch on front end via local storage
router.put('/:listId', asyncHandler(async (req, res, next) => {
    const { title } = req.body; //userId should be passed into the request
    const listId = parseInt(req.params.listId, 10);
    const list = await List.findByPk(listId);
    //if (list && (Number(userId) === list.dataValues.userId)) {
    await list.update({ title });
    res.json({ list });
    // } else {
    //     next(userPermissionError());
    // }
}));

//deletes a list, checks to see if user's id matches with "owner" of list
//userId get passed in from the fetch on front end via local storage
router.delete('/:listId', asyncHandler(async (req, res, next) => {
    //const { userId } = req.body; //userId should be passed into the request
    const listId = parseInt(req.params.listId, 10);
    console.log("listId on backend delete route: ", listId);
    const list = await List.findByPk(listId);
    console.log("list object on backend: ", list);
    //const listUsers = await ListUser.findAll({ where: { listId } });
    // const notes = await Note.findAll({ where: { listId } });
    // if (list && (Number(userId) === list.dataValues.userId)) {
    //     for (let note of notes) {
    //         await note.destroy();
    //     }

    //     for (let listUser of listUsers) {
    //         await listUser.destroy();
    //     }
    await list.destroy();
    res.status(204).end();
    // } else {
    //     next(userPermissionError());
    //     }
}));

module.exports = router;