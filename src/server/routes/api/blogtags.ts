import * as express from 'express';
import db from '../../db';
import blogtags from '../../db/queries/blogtags';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let blogId = Number(req.params.id);
        let blogTagsArray = await db.BlogTags.get(blogId);
        let blogTagsObj = blogTagsArray[0];
        let blogTags = blogTagsObj.map((blogTagObj: { name: string; }) => blogTagObj.name);
        res.send(blogTags);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;