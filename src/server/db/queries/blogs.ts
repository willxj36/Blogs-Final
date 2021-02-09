import { Query } from '../';

const all = async () => await Query('SELECT b.id, b.title, b.content, b.authorid, a.name as author, t.name as tag, b._created FROM blogs b JOIN authors a ON a.id = b.authorid JOIN blogtags bt ON bt.blogid = b.id JOIN tags t ON t.id = bt.tagid ORDER BY id DESC');

const one = async (id: number) => await Query('SELECT b.title, b.content, b.authorid, a.name as author, t.name as tag, b._created FROM blogs b JOIN authors a ON a.id = b.authorid JOIN blogtags bt ON bt.blogid = b.id JOIN tags t ON t.id = bt.tagid WHERE b.id = ?', [id]);

const put = async (title: string, content: string, tags: string, id: number) => {
    await Query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    await Query('UPDATE blogtags SET tagid = (SELECT id FROM tags WHERE name LIKE ?) WHERE blogid = ?', [tags, id]);
}

const post = async (title: string, content: string, authorid: string, tags: string) => {
    let results = await Query('INSERT INTO blogs SET title = ?, content = ?, authorid = ?', [title, content, authorid]);
    let resultParsed = JSON.parse(JSON.stringify(results));
    Query('INSERT INTO blogtags SET blogid = ?, tagid = (SELECT id FROM tags WHERE name LIKE ?)', [resultParsed.insertId, tags])
    return resultParsed;
}

const deleter = async (id: number) => {
    Query('DELETE FROM blogtags WHERE blogid = ?', [id]);
    Query('DELETE FROM blogs WHERE id = ?', [id]);
}

export default { all, one, put, post, deleter };