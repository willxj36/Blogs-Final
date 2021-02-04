import * as React from 'react';
import { useState } from 'react';
import apiService from '../../utils/apiService';

const Contact: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const url = 'http://localhost:3000/api/contact';
    
    const submitHandle = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response = await apiService(url, 'POST', {email, subject, content});
        setEmail('');
        setSubject('');
        setContent('');
        alert(response.message);
    }

    return(
        <div className="wrapper container">
            <form onSubmit={submitHandle} action="submit" className="form-group border border-dark shadow-lg rounded p-3 mt-3">
                <label htmlFor="name">Your email address</label>
                <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} type="email" name="from" id="fromInput" className="border border-primary shadow form-control"/>
                <label htmlFor="subject" className="mt-3">Subject</label>
                <input value={subject} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.currentTarget.value)} type="text" name="subject" id="subjectInput" className="border border-primary shadow form-control"/>
                <label htmlFor="Content" className="mt-3">Message</label>
                <textarea value={content} rows={6} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)} name="Content" id="Contentinput" className="border border-primary shadow form-control"/>
                <button type="submit" className="btn btn-lg btn-success shadow my-3">Send Email!</button>
            </form>
        </div>
    )
};

export default Contact;