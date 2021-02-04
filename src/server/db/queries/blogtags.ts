import { Query } from '../index';

const get = async (id: number) => Query('CALL spBlogTags (?)', [id]);

export default { get };