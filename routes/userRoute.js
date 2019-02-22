import express from 'express';
import userController from '../controllers/userController/userController';


const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', userController.createAccount);
userRoute.post('/api/v1/auth/login', userController.userLogin);

export default userRoute;