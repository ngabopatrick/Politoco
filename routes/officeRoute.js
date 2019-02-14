import express from 'express';
import OfficeController from '../controllers/officeController';

const officeRoute = express.Router();

officeRoute.get('/api/v1/offices', OfficeController.getAllOffices);
officeRoute.get('/api/v1/offices/:id', OfficeController.getOffice);
officeRoute.post('/api/v1/offices', OfficeController.createOffice);
officeRoute.patch('/api/v1/offices/:id', OfficeController.updateOffice);
officeRoute.delete('/api/v1/offices/:id', OfficeController.deleteOffice);

export default officeRoute;