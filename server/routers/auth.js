import express from 'express';
import authCtrl from '../controllers/auth.js';

const router = express.Router();

router.route('/signin').post(authCtrl.signin);

router.route('/signout').post(authCtrl.signout);

export default router;