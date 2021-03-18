const express = require('express');
const db = require('./db.js');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    let meetingList = db.getAllFromDatabase('meetings');
    res.send(meetingList);
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.addToDatabase('meetings', db.createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        res.status(500).send();
    };
});


meetingsRouter.delete('/', (req, res, next) => {
    const isEmpty = db.deleteAllFromDatabase('meetings');
    if (isEmpty.length === 0) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = meetingsRouter;