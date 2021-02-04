import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';
import { createToken } from '../../../utils/security/tokens';

router.post('/', passport.authenticate('local'), async (req: any, res, next) => {
    try {
        let token = await createToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;