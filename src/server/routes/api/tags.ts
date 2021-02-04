import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let tags = await db.Tags.get();
        res.send(tags);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/', (req, res) => {
    try {
        db.Tags.post(req.body.name);
        res.json({message: 'Tag added successfully!'})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;