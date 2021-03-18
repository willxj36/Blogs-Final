import * as React from 'react';
import { useState, useContext } from 'react';

import apiService from '../../utils/apiService';

import { DarkMode, IContextDark, IContextDarkToggle } from '../components/ContextProvider';

const Contact: React.FC = () => {

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const url = '/api/contact';
    
    const submitHandle = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response = await apiService(url, 'POST', {email, subject, content});
        setEmail('');
        setSubject('');
        setContent('');
        alert(response.message);
    }

    return(
        <div className={`bg-${colors.background} min-vh-100 pt-3`}>
            <div className="wrapper container">
                <form onSubmit={submitHandle} action="submit" className={`form-group border border-dark shadow-lg rounded p-3 bg-${colors.cardBackground}`}>
                    <label htmlFor="name" className={colors.text}>Your email address</label>
                    <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} type="email" name="from" id="fromInput" className={`border border-primary shadow form-control bg-${colors.gray} ${colors.text}`}/>
                    <label htmlFor="subject" className={`mt-3 ${colors.text}`}>Subject</label>
                    <input value={subject} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.currentTarget.value)} type="text" name="subject" id="subjectInput" className={`border border-primary shadow form-control bg-${colors.gray} ${colors.text}`}/>
                    <label htmlFor="Content" className={`mt-3 ${colors.text}`}>Message</label>
                    <textarea value={content} rows={6} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)} name="Content" id="Contentinput" className={`border border-primary shadow form-control bg-${colors.gray} ${colors.text}`}/>
                    <button type="submit" className={`btn btn-lg btn-${colors.button} shadow my-3`}>Send Email!</button>
                </form>
            </div>
        </div>
    )
};

export default Contact;