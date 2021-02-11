import { Query } from '../index';

const get = async (id: number) => Query('CALL spBlogTags (?)', [id]);

const post = async (blogId: number, tag: string) => await Query('INSERT INTO blogtags SET blogid = ?, tagid = (SELECT id FROM tags WHERE name LIKE ?)', [blogId, tag]);

export default { get, post };