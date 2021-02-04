import * as express from 'express';
const router = express.Router();
import loginRouter from './login';
import registerRouter from './register';
import logoutRouter from './logout';

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);

export default router;