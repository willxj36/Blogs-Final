import * as express from 'express';
import * as mailgunLoader from 'mailgun-js';
import config from '../../config';

const router = express.Router();

const mailgun = mailgunLoader({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain});

const sendEmail = (to: string, from: string, subject: string, content: string) => {
    let data = {
        to,
        from,
        subject,
        text: content
    };
    return mailgun.messages().send(data);
}

router.post('/', async (req, res) => {
    try {
        await sendEmail('willxj36@gmail.com', req.body.email, req.body.subject, req.body.content);
        res.json({message: 'Email sent'});
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'Email failed to send, please try again'});
    }
});

export default router;