import * as express from 'express';
const router = express.Router();
import db from '../../db';
import { hashPass } from '../../../utils/security/passwords';
import { createToken } from '../../../utils/security/tokens';
import { User } from '../../../utils/models';

router.post('/', async (req: any, res, next) => {
    try {
        let user: User = req.body;
        user.password = hashPass(req.body.password);
        let result: any = await db.Authors.post(user);
        let token = await createToken({ userid: result.insertId });
        res.json({
            token,
            role: 'guest',
            userid: result.insertId
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;