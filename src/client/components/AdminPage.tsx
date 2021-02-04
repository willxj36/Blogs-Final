import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import $ from 'jquery';

const AdminPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [users, setUsers] = useState([]);

    const url = 'http://localhost:3000/api/authors'

    useEffect(() => {
        if(User.role !== 'admin' && User.role !== 'webmaster') {
            history.push('/');
        }

        (async () => {
            let users = await apiService(url);
            setUsers(users);
        })()
    }, []);

    const roleChange = async (userid: number) => { //calls query that changes a user's role in the db
        let role = $(`#role${userid}`).val();
        let res = await apiService(`${url}/${userid}`, 'PUT', {
            role
        });
        alert(res.message);
    }

    return(
        <div className="col container">
            {users.map(user => { //wouldn't let me include the button having to do with the webmaster role in the rest of the ternary curly braces. Note that webmaster and admin are identical except webmaster can't have role changed through the front end. Mostly just did that so I didn't accidentally get rid of my only admin acct from the front end and have to fix it through mysql
                return (
                    <div key={user.id} className="card border shadow p-3">
                        <h5>User ID: {user.id}</h5>
                        <h5>Author Name: {user.name}</h5>
                        <h5>Author Email: {user.email}</h5>
                        <div className="row my-2">
                            {user.role === 'webmaster' ? <h5 className="ml-3">Page Owner i.e. Supreme Leader of this page</h5> : <select className="mx-3" name="role" id={`role${user.id}`}>
                                <option value={user.role}>{user.role}</option>
                                <option value="admin">admin</option>
                                <option value="author">author</option>
                                <option value="guest">guest</option>
                            </select>}
                            {user.role === 'webmaster' ? null : <button onClick={(e) => roleChange(user.id)} className="btn btn-primary mx-3">Submit Role Change</button> }                        </div>
                        <p className="text-muted">Registered: {user._created}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default AdminPage;