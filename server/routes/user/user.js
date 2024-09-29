import express from 'express';

import { signup } from '../../controller/user/user.js';
import { login } from '../../controller/user/user.js';

const route = express.Router();

// Define separate routes for signup and login
route.post('/signup', signup);
route.post('/login', login);

export default route;