import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return(
        <div className="d-flex navbar bg-midnight shadow border border-dark">
            <h3 className="text-white">Bloggy Blogger Blogs</h3>
            <Link to='/' className="btn btn-lg btn-outline-medgray text-white ml-auto mr-2">Home</Link>
            <Link to='/authorpage' className="btn btn-lg btn-outline-medgray text-white mr-2">Author Page</Link>
            <Link to='/donate' className="btn btn-lg btn-outline-medgray text-white mr-2">Donate to our Blog!</Link>
            <Link to='/contact' className="btn btn-lg btn-outline-medgray text-white">Contact Us</Link>
        </div>
    )

}

export default Navbar;