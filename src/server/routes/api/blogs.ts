import * as express from 'express';
import db from '../../db';
import { isAuthor } from './permissions';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        if(id) {
            let [blog] = await db.Blogs.one(id);
            let tags = await db.BlogTags.get(id);
            blog.tag = tags; //property is singular because originally only one tag was allowed per post and changing the types everywhere would be a nightmare
            res.send(blog);
        } else {
            let blogs = await db.Blogs.all();
            blogs.forEach(async blog => {
                let tags = await db.BlogTags.get(blog.id);
                blog.tag = tags;
            });
            res.send(blogs);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', isAuthor, async (req, res, next) => {
    try {
        let {title, content, authorid, tags} = req.body;
        let response = await db.Blogs.post(title, content, authorid);
        tags.forEach(async (tag: string) => {
            await db.BlogTags.post(response.insertId, tag);
        })
        res.send(response);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.put('/:id', isAuthor, async (req, res, next) => {
    try {
        let {title, content, tags} = req.body;
        let id = Number(req.params.id);
        await db.Blogs.put(title, content, id);
        res.json({message: 'Blog updated successfully!'});
        tags.forEach(async (tag: string) => {
            await db.BlogTags.post(id, tag);
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/:id', isAuthor, async (req, res) => {
    try {
        let id = Number(req.params.id);
        db.Blogs.deleter(id);
        res.json({message: 'Blog deleted successfully!'})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;