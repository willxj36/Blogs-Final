import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import * as dayjs from 'dayjs';
import { Blog } from '../../utils/models'


const FullBlog = () => {
    
    const { id } = useParams<{id: string}>();
    const [blog, setBlog] = useState<Blog>({
        id: null,
        title: null,
        content: null,
        author: null,
        authorid: null,
        _created: null,
        _updated: null,
        tag: null
    });
    const [date, setDate] = useState<any>();
    const [update, setUpdate] = useState<any>();

    useEffect(() => {
        (async() => {
            const url = `http://localhost:3000/api/blogs/${id}`;
            let blog= await apiService(url);
            setBlog(blog[0]);
        })()
    }, [id]);

    useEffect(() => {
        let date = dayjs(`${blog._created}`).format('MMM DD, YYYY');
        setDate(date);
        if (blog._updated) {
            let update = dayjs(`${blog._updated}`).format('MMM DD, YYYY');
            setUpdate(update);
        }
    }, [blog]);

    return (
        <div className="container p-5 col-12">
            <div className="row">
                <img src="/space-stock.jpg" alt="Header image" className="col-5 mb-5 display-inline img-responsive"/>
            </div>
            <h1>{blog.title}</h1>
            <p><span className="badge badge-warning">{blog.tag}</span></p>
            <h4 className="font-italic my-3">By {blog.author}</h4>
            <h4 className="text-muted my-3">{date}</h4>
            {update ? <p className="my-2 text-muted">Edited on {update}</p> : null }
            <p className="mt-3">{blog.content}</p>
        </div>
    )
}

export default FullBlog;