import express from 'express';
import createParty from '../controllers/partyController/createParty';
import getParties from '../controllers/partyController/getParties';
import getParty from '../controllers/partyController/getParty';
import updateParty from '../controllers/partyController/updateParty';

const partyRoute = express.Router();

partyRoute.get('/api/v1/parties', getParties.getParties);
partyRoute.get('/api/v1/parties/:id', getParty.getParty);
partyRoute.post('/api/v1/parties', createParty.createParty);
partyRoute.patch('/api/v1/parties/:id', updateParty.updateParty);
// partyRoute.delete('/api/v1/parties/:id', deleteParty);

export default partyRoute;