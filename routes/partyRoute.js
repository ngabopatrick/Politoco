import express from 'express';
import partyController from '../controllers/partyController';

const partyRoute = express.Router();

partyRoute.get('/api/v1/parties', partyController.getAllParties);
partyRoute.get('/api/v1/parties/:id', partyController.getParty);
partyRoute.post('/api/v1/parties', partyController.createParty);
partyRoute.patch('/api/v1/parties/:id', partyController.updateParty);
partyRoute.delete('/api/v1/parties/:id', partyController.deleteParty);

export default partyRoute;