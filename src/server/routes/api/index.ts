import * as express from 'express';
import * as passport from 'passport';
import blogRouter from './blogs';
import authorRouter from './authors';
import tagRouter from './tags';
import blogTagRouter from './blogtags';
import donateRouter from './donate';
import contactRouter from './contact';

const router = express.Router();

router.use((req: any, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next)
});

router.use('/blogs', blogRouter);
router.use('/authors', authorRouter);
router.use('/tags', tagRouter);
router.use('/blogtags', blogTagRouter);
router.use('/donate', donateRouter);
router.use('/contact', contactRouter);

export default router;