import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../utils/apiService';
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
        tag: null
    });
    const [date, setDate] = useState<any>();

    useEffect(() => {
        (async() => {
            const url = `/api/blogs/${id}`;
            let blog= await apiService(url);
            setBlog(blog);
        })()
    }, [id]);

    useEffect(() => {
        let date = dayjs(`${blog._created}`).format('MMM DD, YYYY');
        setDate(date);
    }, [blog]);

    return (
        <div className="container p-5 col-12">
            <div className="row">
                <img src="/space-stock.jpg" alt="Header image" className="col-5 mb-5 display-inline img-responsive"/>
            </div>
            <h1>{blog.title}</h1>
            <p><span className="badge badge-warning">{blog.tag[0]}</span></p>
            <h4 className="font-italic my-3">By {blog.author}</h4>
            <h4 className="text-muted my-3">{date}</h4>
            <p className="mt-3">{blog.content}</p>
        </div>
    )
}

export default FullBlog;