const express = require('express');
const db = require('./db.js');

const workRouter = express.Router({mergeParams: true});


workRouter.param('workId', (req, res, next, id) => {
    const workFromDb = db.getFromDatabaseById('work', id);
    if (workFromDb) {
        req.workId = workFromDb.id;
        next();
    } else {
        res.status(404).send('This item does not exist!');
    };
});

const checkIfRightMinion = (req, res, next) => {
    const workToBeChanged = db.getFromDatabaseById('work', req.workId);
    console.log(`Request Minion Id ${req.params.minionId} | Database Id: ${workToBeChanged.minionId}`);
    if (workToBeChanged.minionId === req.params.minionId) {
        next();
    } else {
        res.status(400).send();
    }
};

workRouter.get('/', (req, res, next) => {
    const work = db.getAllWorkWithMinionId(req.params.minionId);
    if (work) {
        res.send(work); 
    } else {
        res.status(500).send();
    };
});

workRouter.post('/',  (req, res, next) => { 
    newWork = db.addToDatabase('work', req.body);
    if (newWork) {
        res.status(201).send(newWork);
    } else {
        res.status(500).send();
    }
});

workRouter.put('/:workId', checkIfRightMinion, (req, res, next) => {
    newItem = db.updateInstanceInDatabase('work', req.body);
    if (newItem) {
        res.status(200).send(newItem);
    } else {
        res.status(500).send("There was an internal error");
    };
});

workRouter.delete('/:workId', (req, res, next) => {
    const deletedItem = db.deleteFromDatabasebyId('work', req.workId);
    res.status(204).send();
     if (deletedItem) {
        res.status(204).send();
    } else {
        res.status(500).send();
    };
});



module.exports = workRouter;