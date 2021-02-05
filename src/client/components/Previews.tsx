import * as React from 'react';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import { Blog } from '../../utils/models';

const url = '/api/blogs'

const Previews = () => {

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
        <div className="container col-12 row">
            {blogs.map(blog => {
                let date = dayjs(`${blog._created}`).format('MMM DD, YYYY');
                return (
                    <div className="card border shadow col-3 m-5" key={blog.id}>
                        <div className="card-header m-1">
                            <img src="/space-stock.jpg" className="card-img-top" alt="Default preview pic"/>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title font-weight-bold">{blog.title}</h4>
                            <h5 className="card-subtitle text-muted my-2">{date}</h5>
                            <h5 className="card-subtitle my-2">{blog.author}</h5>
                            <h6 className="mt-3"><span className="p-2 badge badge-warning">{blog.tag}</span></h6>
                        </div>
                        <div className="card-footer bg-white">
                            <Link to={`/blogs/${blog.id}`} className="btn btn-primary mb-1">View Blog</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Previews;