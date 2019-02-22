import express from 'express';
import auth from '../middleware/auth';
import createParty from '../controllers/partyController/createParty';
import getParties from '../controllers/partyController/getParties';
import getParty from '../controllers/partyController/getParty';
import updateParty from '../controllers/partyController/updateParty';
import deleteParty from '../controllers/partyController/deleteParty';

const partyRoute = express.Router();

partyRoute.get('/api/v1/parties', auth.verifyToken, getParties.getParties);
partyRoute.get('/api/v1/parties/:id',auth.verifyToken, getParty.getParty);
partyRoute.post('/api/v1/parties', auth.verifyToken, createParty.createParty);
partyRoute.patch('/api/v1/parties/:id', auth.verifyToken, updateParty.updateParty);
partyRoute.delete('/api/v1/parties/:id', auth.verifyToken, deleteParty.deleteParty);

export default partyRoute;