import * as express from 'express';
const router = express.Router();
import db from '../../db';

router.get('/:id', async (req: any, res) => {
    try {
        let userid = req.params.id;
        let response = await db.AccessTokens.deleter(userid);
        req.logout();
        if(response) {
            res.json({status: 200});
        } else {
            throw Error;
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;