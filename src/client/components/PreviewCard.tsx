import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';

import { Blog } from '../../utils/models';
import apiService from '../../utils/apiService';

interface IPreviewCardProps {
    blog: Blog
}

const PreviewCard: React.FC<IPreviewCardProps> = ({ blog }) => {

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            try{
                let tags = await apiService(`/api/blogtags/${blog.id}`);
                setTags(tags);
            } catch(e) {
                console.log(e);
                alert('Tags failed to load');
            }
        })()
    }, [blog])

    let date = dayjs(`${blog._created}`).format('MMM DD, YYYY');

    return (
        <div className="card border shadow col-3 m-5" key={blog.id}>
            <div className="card-header m-1">
                <img src="/space-stock.jpg" className="card-img-top" alt="Default preview pic" />
            </div>
            <div className="card-body">
                <h4 className="card-title font-weight-bold">{blog.title}</h4>
                <h5 className="card-subtitle text-muted my-2">{date}</h5>
                <h5 className="card-subtitle my-2">{blog.author}</h5>
                <div className="row">
                    {tags.map(tag => (
                        <h6 className="mt-3 mx-2"><span className="p-2 badge badge-warning">{tag}</span></h6>
                    ))}
                </div>
            </div>
            <div className="card-footer bg-white">
                <Link to={`/blogs/${blog.id}`} className="btn btn-primary mb-1">View Blog</Link>
            </div>
        </div>
    )

}

export default PreviewCard;