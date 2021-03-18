import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import $ from 'jquery';

import { DarkMode, IContextDark } from '../components/ContextProvider';

const AdminPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [users, setUsers] = useState([]);

    const url = '/api/authors'

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
        <div className={`bg-${colors.background}`}>
            <div className="col container">
                {users.map(user => { //wouldn't let me include the button having to do with the webmaster role in the rest of the ternary curly braces
                    return (
                        <div key={user.id} className={`card ${colors.cardBorder} shadow p-3 bg-${colors.cardBackground}`}>
                            <h5 className={colors.text}>User ID: {user.id}</h5>
                            <h5 className={colors.text}>Author Name: {user.name}</h5>
                            <h5 className={colors.text}>Author Email: {user.email}</h5>
                            <div className="row my-2">
                                {user.role === 'webmaster' ? <h5 className={`ml-3 ${colors.text}`}>Page Owner</h5> : <select className="mx-3" name="role" id={`role${user.id}`}>
                                    <option value={user.role}>{user.role}</option>
                                    <option value="admin">admin</option>
                                    <option value="author">author</option>
                                    <option value="guest">guest</option>
                                </select>}
                                {user.role === 'webmaster' ? null : <button onClick={(e) => roleChange(user.id)} className={`btn btn-${colors.button} mx-3`}>Submit Role Change</button> }                        </div>
                            <p className="text-muted">Registered: {user._created}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminPage;