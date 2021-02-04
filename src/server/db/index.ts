import Blogs from './queries/blogs';
import Authors from './queries/authors';
import Tags from './queries/tags';
import BlogTags from './queries/blogtags';
import AccessTokens from './queries/accesstokens';
import * as mysql from 'mysql';
import config from '../config';
import { User } from '../../utils/models';

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: any) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            err ? reject(err) : resolve(results);
        })
    })
};

export default {
    Blogs,
    Authors,
    Tags,
    BlogTags,
    AccessTokens
};