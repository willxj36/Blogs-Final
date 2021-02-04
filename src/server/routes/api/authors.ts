import * as express from 'express';
import db from '../../db';
import { isAdmin } from './permissions';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let authors = await db.Authors.get();
        res.send(authors);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.put('/:id', isAdmin, (req, res) => {
    try {
        let user = req.body;
        let id = Number(req.params.id);
        db.Authors.put(user, id);
        res.json({message: 'Author edited!'})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/:id', isAdmin, (req, res) => {
    try {
        let id = Number(req.params.id);
        db.Authors.deleter(id);
        res.json({message: 'Author removed!'})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;