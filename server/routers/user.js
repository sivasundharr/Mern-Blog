import express from 'express';
import userCtrl from '../controllers/user.js';
import authCtrl from '../controllers/auth.js';

const router = express.Router();

router.route('/').get(userCtrl.list).post(userCtrl.create);

router.route('/:userId')
.get(authCtrl.requireSignIn ,userCtrl.read)
.put(authCtrl.requireSignIn,authCtrl.hasAuthorization,userCtrl.update)
.delete(authCtrl.requireSignIn,authCtrl.hasAuthorization,userCtrl.remove);

router.param('userId',userCtrl.userByID)

export default router;