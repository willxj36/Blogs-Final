import { Query } from '../';

const get = async () => Query('SELECT * FROM tags');

const post = async (name: string) => Query('INSERT INTO tags SET name = ?', [name]);

export default { get, post };