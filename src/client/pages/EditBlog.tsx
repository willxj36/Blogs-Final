import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import $ from 'jquery';
import { Blog } from '../../utils/models';
import blogtags from '../../server/db/queries/blogtags';

const EditBlog: React.FC<RouteComponentProps> = ({ history }) => {

    const { id } = useParams<{id: string}>();

    const [blog, setBlog] = useState<Blog>();
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState<any>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const url = `/api/blogs/${id}`;
    const urlTags = '/api/tags';
    const urlCurrentTag = `/api/blogtags/${id}`;

    useEffect(() => {
        if(!User || User.userid === null || User.role === 'guest') { //only allows author and above to any edit page
            history.push('/');
        }

        (async () => {
            let blog = await apiService(url); //get and set specific blog
            setBlog(blog);

            let loadedTags = await apiService(urlCurrentTag); //get blog's current tag to make it default for the select dropdown
            loadedTags.forEach((loadedTag: string) => setCurrentTag((currentTag: string[]) => [...currentTag, loadedTag]));
            
            let tags = await apiService(urlTags); //get all tags
            setTags(tags);
        })();
    }, [id]);

    useEffect(() => {
        if(blog) {
            setTitle(blog.title);
            setContent(blog.content);
            if(User.userid != blog.authorid && (User.role !== 'admin' && User.role !== 'webmaster')) { //after loading blog, makes sure that an 'author' role can only edit blogs that they posted. Admin can edit any
                alert('You can only edit your own blogs!');
                history.push('/authorpage');
            }
        }
    }, [blog]);

    const handleTitle = (titleText: string) => setTitle(titleText);

    const handleContent = (contentText: string) => setContent(contentText);

    const handleEdit = async () => {
        let newTag = $('#tags-edit').val();
        let tags = []; //Mobile app allows multiple tags and thus the server requires the tags in an array. Will probably experiment with implementing this on the website too later.
        tags.push(newTag);
        await apiService(url, 'PUT', {
            title,
            content,
            tags, 
            "authorid": blog.authorid
        });
        history.goBack();
    }

    const handleDelete = async () => {
        await apiService(url, 'DELETE');
        history.push('/');
    }

    return (
        <div className="col container shadow border">
            <h5 className="form-label mt-4">Title</h5>
            <input onChange={(e) => {handleTitle(e.currentTarget.value)}} type="text" name="title" id="title-edit" defaultValue={blog?.title} className="form-control"/>
            <h5 className="form-label mt-4">Content</h5>
            <input onChange={(e) => {handleContent(e.currentTarget.value)}} type="text" name="content" id="content-edit" defaultValue={blog?.content} className="form-control"/>
            <h5 className="form-label mt-4">Tags</h5>
            <select name="tags" id="tags-edit" className="mb-3">
                <option value={currentTag[0]}>{currentTag[0]}</option> 
                {tags.map(tag => {
                    if(tag.name !== currentTag[0]) { //make a new select box for all tags not current (note that this is only using the first of the current tags; this is a temp fix due to a change in the code for mobile app functionality that will be fixed here later on)
                        return (
                            <option key={tag.id} value={tag.name}>{tag.name}</option>
                        )
                    }
                })}
            </select>
            <div className="row">
                <button onClick={handleEdit} className="btn btn-secondary m-3">Submit Edit</button>
                <button onClick={handleDelete} className="btn btn-danger my-3">Delete Blog</button>
                <button onClick={() => history.goBack()} className="btn btn-warning ml-auto my-3 mr-3">Go back to Author Page</button>
            </div>
        </div>
    )
}

export default EditBlog;