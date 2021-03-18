const express = require('express');
const db = require('./db');
const workRouter = require('./workRouter');

const minionsRouter = express.Router();

minionsRouter.use('/:minionId/work', workRouter);

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found!');
    };
});

minionsRouter.get('/', (req, res, next) => {
    const allMinions = db.getAllFromDatabase('minions');
    res.send(allMinions);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    } else {
        res.status(500).send('An Error has occurred');
    };
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const reqMinionWithId = req.body.id = req.minion.id;
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.status(200).send(updatedMinion);
    } else {
        res.status(500).send('An error has occurred');
    };
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId('minions', req.minion.id);
    if (deletedMinion) {
        res.status(204).send();
    } else {
        res.status(500).send();
    };
});



module.exports = minionsRouter;