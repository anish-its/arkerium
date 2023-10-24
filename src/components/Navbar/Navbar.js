import React, { useRef } from "react";
import NavbarCss from './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(props) {
    const buttonRef = useRef(null);
    function buttononoff(){
        buttonRef.current.style.display = buttonRef.current.style.display ? "" : "flex";
    }
    return (
        <nav className="nav-main" style={NavbarCss}>
            <div className="nav-sub">
                <Link to={"/"} className="flex items-center">
                    <img className="h-8 mr-3" src={process.env.PUBLIC_URL+'/logo/logo.png'} alt="not_found"/>
                </Link>
                <button data-collapse-toggle="navbar-default" onClick={buttononoff} type="button" className="nav-button" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="nav-menu" ref={buttonRef} id="navbar-default">
                    <ul className="nav-list">
                        <li>
                            <NavLink to={"/"} className="nav-list-item">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/About"} className="nav-list-item">About</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Feature"} className="nav-list-item">Feature</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Roadmap"} className="nav-list-item">Roadmap</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Faq"} className="nav-list-item">Faq</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Login"} className="nav-list-item">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Register"} className="nav-list-item">Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}