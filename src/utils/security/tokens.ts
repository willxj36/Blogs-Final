import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import db from '../../server/db';
import { Payload } from '../models';
import config from '../../server/config';

export const createToken = async (payload: Payload) => {
    let tokenid: any = await db.AccessTokens.insert(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    await db.AccessTokens.update(payload.accesstokenid, token);
    return token;
}

export const validToken = async (token: string) => {
    let payload: Payload = <Payload>jwt.decode(token);
    let [accesstokenid] = await db.AccessTokens.getOne(payload.accesstokenid, token);
    if(!accesstokenid) {
        throw new Error('Invalid Token');
    } else {
        return payload;
    }
}