import express from 'express';
import createOffice from '../controllers/officeController/createOffice';
import getOffice from '../controllers/officeController/getOffice';
import getOffices from '../controllers/officeController/getOffices';


const officeRoute = express.Router();

officeRoute.get('/api/v1/offices', getOffices.getOffices);
officeRoute.get('/api/v1/offices/:id', getOffice.getOffice);
officeRoute.post('/api/v1/offices', createOffice.createOffice);

export default officeRoute;