import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">MEDImap</h1>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <Link to="/about" className="header__nav-link">About</Link>
                    </li>
                
                </ul>
            </nav>
        </header>
    );
}
export default Header;