import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let blogId = Number(req.params.id);
        let blogTags = await db.BlogTags.get(blogId);
        res.send(blogTags);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;