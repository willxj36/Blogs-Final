import * as express from 'express';
const router = express.Router();
import db from '../../db';

router.get('/:id', async (req: any, res) => {
    try {
        let userid = req.params.id;
        await db.AccessTokens.deleter(userid);
        req.logout();
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;