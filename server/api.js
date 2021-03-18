const express = require('express');
const apiRouter = express.Router();
const meetingsRouter = require('./meetingsRouter');
const ideasRouter = require('./ideasRouter');
const minionsRouter = require('./minionsRouter');

apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/minions', minionsRouter);



module.exports = apiRouter;
