import express from 'express';
import auth from '../middleware/auth';
import createOffice from '../controllers/officeController/createOffice';
import getOffice from '../controllers/officeController/getOffice';
import getOffices from '../controllers/officeController/getOffices';


const officeRoute = express.Router();

officeRoute.get('/api/v1/offices', auth.verifyToken, getOffices.getOffices);
officeRoute.get('/api/v1/offices/:id',auth.verifyToken, getOffice.getOffice);
officeRoute.post('/api/v1/offices',auth.verifyToken, createOffice.createOffice);

export default officeRoute;