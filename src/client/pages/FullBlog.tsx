import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../utils/apiService';
import * as dayjs from 'dayjs';
import { Blog } from '../../utils/models'

import { DarkMode, IContextDark } from '../components/ContextProvider';

const FullBlog = () => {
    
    const { id } = useParams<{id: string}>();

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [blog, setBlog] = useState<Blog>({
        id: null,
        title: null,
        content: null,
        author: null,
        authorid: null,
        _created: null,
    });
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState<any>();

    useEffect(() => {
        (async() => {
            const url = `/api/blogs/${id}`;
            let blog= await apiService(url);
            setBlog(blog);
            let tags = await apiService(`/api/blogtags/${id}`);
            setTags(tags);
        })()
    }, [id]);

    useEffect(() => {
        let date = dayjs(`${blog._created}`).format('MMM DD, YYYY');
        setDate(date);
    }, [blog]);

    return (
        <div className={`bg-${colors.cardBackground} min-vh-100`}>
            <div className={`wrapper container p-5 bg-${colors.gray}`}>
                <div className="row">
                    <img src="/space-stock.jpg" alt="Header image" className="col-5 mb-5 display-inline img-responsive"/>
                </div>
                <h1 className={colors.text}>{blog.title}</h1>
                <div className="row ml-0 mt-3">
                    {tags.map(tag => (
                        <p><span className="mx-1 badge badge-warning">{tag}</span></p>
                    ))}
                </div>
                <h4 className={`font-italic my-3 ${colors.text}`}>By {blog.author}</h4>
                <h4 className="text-muted my-3">{date}</h4>
                <p className={`mt-3 ${colors.text}`} style={{whiteSpace: 'pre-wrap'}}>{blog.content}</p>
            </div>
        </div>
    )
}

export default FullBlog;