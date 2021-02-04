import { Query } from '../';
import { User } from '../../../utils/models';

const get = async () => await Query('SELECT * FROM authors')

const getOneEmail = async (email: string) => await Query('SELECT * FROM authors WHERE email LIKE ? LIMIT 1', [email]);

const getOneId = async (id: number) => await Query('SELECT * FROM authors WHERE id = ? LIMIT 1', [id]);

const post = async (user: User) =>  await Query('INSERT INTO authors SET ?', user);

const put = async (user: User, id: number) => await Query('UPDATE authors SET ? WHERE id = ?', [user, id]);

const deleter = async (id: number) => await Query('DELETE FROM authors WHERE id = ?', [id]);

export default { get, getOneEmail, getOneId, post, put, deleter };