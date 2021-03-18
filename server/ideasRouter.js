const express = require('express');
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideasRouter = express.Router();

const checkValidity = (req, res, next) => {
    const result = db.isValidIdea(req.body);
    if (result) {
        next();
    } else {
        res.status(400).send('Invalid request body');
    };
};

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found!');
    };
});

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkValidity, checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkValidity, checkMillionDollarIdea, (req, res, next) => {
    const idea = db.updateInstanceInDatabase('ideas', req.body);
    if (idea) {
        res.status(200).send(idea);
    } else {
        res.status(500).send();
    };
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const result = db.deleteFromDatabasebyId('ideas', req.idea.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Object not found');
    };
});

module.exports = ideasRouter;