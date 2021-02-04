import * as express from 'express';
const router = express.Router();
import config from '../../config';

import Stripe from 'stripe';
const stripe = new Stripe(config.stripe.secretKey, {apiVersion: '2020-08-27'});

router.post("/create-payment-intent", async (req: any, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

const charge = (token: any, amt: number, message?: string) => {
    let description = (message ? `Donation - ${message}` : 'Donation');
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description
    });
};

router.post('/', async (req, res) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount, req.body.message);
        res.json({data, message: 'Accepted! Thank you for the donation!'});
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong processing your payment. Please try again.'});
    }
});

export default router;