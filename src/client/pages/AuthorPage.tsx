import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import $ from 'jquery';
import dayjs from 'dayjs';
import { Blog } from '../../utils/models';

import { DarkMode, IContextDark } from '../components/ContextProvider';

const AuthorPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [tags, setTags] = useState([]);
    const [blogs, setBlogs] = useState<Array<Blog>>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const blogUrl = '/api/blogs';
    const tagUrl = '/api/tags';

    useEffect(() => { 
        if(!User || User.userid === null) {
            history.replace('/login')
        };

        (async () => {
            let tags = await apiService(tagUrl); //gets and sets tag options
            setTags(tags);

            let allBlogs: Blog[] = await apiService(blogUrl);
            if(User.role === 'admin' || User.role === 'webmaster') {
                setBlogs(allBlogs);
            } else {
                let blogs: Blog[] = allBlogs.filter(blog => { //makes it so that if user is an 'author', only the blogs they posted show up to be edited
                    return blog.authorid == User.userid
                })
                setBlogs(blogs);
            }
        })();
    }, []);

    const handleTitle = (titleText: string) => setTitle(titleText);

    const handleContent = (contentText: string) => setContent(contentText);

    const handleSubmit = async () => { //submits new blog
        let authorid = User.userid;
        let tags = $('#tags').val();
        let res = await apiService(blogUrl, 'POST', {
            title,
            content,
            authorid,
            "tags": [tags] //Mobile app allows multiple tags, so server needs an array. Will change site later to accept multiple tags as well
        });
        history.push(`/blogs/${res.insertId}`); //takes you to the newly created blog
    }

    const logout = async () => {
        localStorage.clear();
        let url = `/auth/logout/${User.userid}`;
        await apiService(url);
        alert('Logged out successfully!');
        location.reload();
    }

    if(User.role === 'admin' || User.role === 'author' || User.role === 'webmaster') {
        return ( //may try to make it so that User also carries actual author name at some point, for now userid will work as a stand-in
            <div className={`bg-${colors.background}`}>
                <div className={`col container shadow ${colors.cardBorder} bg-${colors.cardBackground}`}>
                    <div className="row">
                        <h5 className={`form-label ml-3 mt-4 ${colors.text}`}>Logged in as: {User.userid}</h5> 
                        <button onClick={logout} className="btn btn-warning align-self-center mt-3 ml-auto mr-3">Logout</button>
                        { User.role === 'admin' || User.role === 'webmaster' ? <Link to="/adminpage" className="btn btn-warning align-self-center mt-3 mr-3">Users Admin Options</Link> : null }
                    </div>
                <h5 className={`form-label mt-4 ${colors.text}`}>Title</h5>
                    <input onChange={(e) => handleTitle(e.currentTarget.value)} type="text" name="title" id="title" className={`form-control bg-${colors.gray} ${colors.text}`}/>
                <h5 className={`form-label mt-4 ${colors.text}`}>Content</h5>
                    <textarea onChange={(e) => handleContent(e.currentTarget.value)} rows={6} name="content" id="content" className={`form-control bg-${colors.gray} ${colors.text}`}/>
                <h5 className={`form-label mt-4 ${colors.text}`}>Tags</h5>
                    <select name="tags" id="tags" className="mb-3">
                        <option value="" id="defaultTag">-- Please select a tag --</option>
                        {tags.map(tag => {
                            return (
                                <option key={tag.id} value={tag.name}>{tag.name}</option>
                            );
                        })}
                    </select>
                    <div className="row">
                        <button onClick={handleSubmit} className={`btn btn-${colors.button} m-3`}>Submit New Blog</button>
                        <button onClick={() => history.goBack()} className="btn btn-warning ml-auto my-3 mr-3">Go back</button>
                    </div>
                </div>
                <div className={`col container bg-${colors.background}`}>
                    <h3 className={`my-3 ${colors.text}`}>Click on a blog below to edit or delete</h3>
                        {blogs.map(blog => {
                            let created = dayjs(`${blog._created}`).format('MMM DD, YYYY');
                            return(
                                <Link to={`/blogs/${blog.id}/edit`} key={blog.id}>
                                    <div className={`card m-3 p-3 col-6 bg-${colors.cardBackground}`}>
                                        <h4 className={`card-title ${colors.text}`}>{blog.title}</h4>
                                        <h5 className={`card-subtitle ${colors.text}`}>{created}</h5>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={`bg-${colors.background} min-vh-100`}>
                <div className={`col container shadow ${colors.cardBorder} bg-${colors.cardBackground}`}>
                    <div className="row">
                        <h3 className={`m-3 p-3 ${colors.text}`}>Welcome to the author page! An admin will need to grant you author permissions before you can post here.</h3>
                        <button onClick={logout} className="btn btn-warning align-self-center my-3 ml-auto mr-3">Logout</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default AuthorPage;