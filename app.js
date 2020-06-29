const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const notesRouter = require('./routes/notes');
const { environment } = require('./config');

app.set('view engine', 'pug');
app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/', notesRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const error = new Error("The requested resource couldn't be found.");
    error.status = 404;
    next(error);
});

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;