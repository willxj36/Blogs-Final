import * as React from 'react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import { DarkToggle, IContextDarkToggle } from '../components/ContextProvider';

const Navbar = () => {

    const [, setDarkToggle] = useContext<IContextDarkToggle>(DarkToggle);

    return(
        <div className="d-flex navbar shadow" style={{background: 'linear-gradient(#040040, #0F00F0'}}>
            <Link to='/' className="btn btn-lg btn-outline-dark border-0 text-white">Will's Blogs</Link>
            <Link to='/authorpage' className="btn btn-lg btn-outline-dark border-0 text-white ml-auto mr-2">Author Page</Link>
            <Link to='/donate' className="btn btn-lg btn-outline-dark border-0 text-white mr-2">Donate to our Blog!</Link>
            <Link to='/contact' className="btn btn-lg btn-outline-dark border-0 text-white">Contact Us</Link>
            <BootstrapSwitchButton 
                style="mx-3" 
                width={125} 
                onlabel="Dark Mode" 
                offlabel="Light Mode"
                onstyle="dark"
                offstyle="primary"
                onChange={(checked: boolean) => setDarkToggle(checked)} />
        </div>
    )

}

export default Navbar;