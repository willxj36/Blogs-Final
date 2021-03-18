import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import apiService, { SetAccessToken, User } from '../../utils/apiService';

import { DarkMode, IContextDark } from '../components/ContextProvider';

const Register: React.FC<RouteComponentProps> = ({ history }) => {

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    let saving: boolean = false;

    useEffect(() => {
        if(User.userid) {history.replace('/')};
    }, []);

    const handleName = (nameText:string) => setName(nameText);

    const handleEmail = (emailText: string) => setEmail(emailText);

    const handlePassword = (passText: string) => setPassword(passText);

    const url = '/auth/register';

    const handleSubmit = async () => {
        try {
            saving = true;
            let result: any = await apiService(url, 'POST', {
                name,
                email,
                password
            });
            if(result) {
                SetAccessToken(result.token, {userid: result.userid, role: result.role});
                saving = false;
                if(User.role === 'admin' || User.role === 'author') { //all new users will be defaulted to guest so this part doesn't really matter but implementing something later to make it relevant might be cool
                    history.push('/authorpage');
                } else {
                    alert('Welcome guest! To add or edit blogs, you must be a registered author. But feel free to peruse the blogs!');
                    history.push('/');
                }
            } else {
                alert('Login information does not match any users. Please try again.');
                saving = false;
            }
        } catch(e) {
            throw (e);
        }
    }

    return(
        <div className={`pt-4 bg-${colors.background} min-vh-100`}>
            <div className={`pt-2 col-6 container shadow ${colors.cardBorder} bg-${colors.cardBackground}`}>
                <h5 className={`form-label ${colors.text}`}>Name</h5>
                <input onChange={(e) => handleName(e.currentTarget.value)} type="text" name="name" id="name" className="form-control"/>
                <h5 className={`form-label mt-4 ${colors.text}`}>Email</h5>
                <input onChange={(e) => handleEmail(e.currentTarget.value)} type="text" name="email" id="email" className="form-control"/>
                <h5 className={`form-label mt-4 ${colors.text}`}>Password</h5>
                <input type="password" onChange={(e) => handlePassword(e.currentTarget.value)} name="password" id="password" className="form-control"/>
                <div className="row">
                    <button onClick={handleSubmit} className={`btn btn-${colors.button} m-3`}>Register</button>
                    <button onClick={() => history.push('/')} className="btn btn-warning ml-auto my-3 mr-3">Go back to Home</button>
                </div>
            </div>
        </div>
    )
}

export default Register;