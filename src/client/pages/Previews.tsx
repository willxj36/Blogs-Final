import * as React from 'react';
import { useEffect, useState, useContext } from 'react';

import apiService, { User } from '../../utils/apiService';
import { Blog } from '../../utils/models';
import PreviewCard from '../components/PreviewCard';

import { DarkMode, IContextDark } from '../components/ContextProvider';

const url = '/api/blogs'

const Previews = () => {

    const [colors, ] = useContext<IContextDark>(DarkMode);

    const [blogs, setBlogs] = useState<Array<Blog>>([]);

    useEffect(() => {
        (async () => {
            try{
                let blogs = await apiService(url);
                setBlogs(blogs);
            } catch(e) {
                console.log(e);
                alert('Something went wrong loading blogs');
            }
        })()
    }, []);

    return (
        <div className={`container col-12 row bg-${colors.background}`}>
            {blogs.map(blog => (
                <PreviewCard blog={blog} />
            ))}
        </div>
    );
}

export default Previews;