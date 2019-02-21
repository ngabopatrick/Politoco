import express from 'express';
import createUser from '../controllers/userController/createUser';
// import userLogin from '../controllers/userController/userLogin';


const userRoute = express.Router();

// userRoute.get('/api/v1/users/:id', userLogin.userLogin);
userRoute.post('/api/v1/users', createUser.createUser);

export default userRoute;