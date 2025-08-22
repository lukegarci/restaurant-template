import { useEffect } from 'react';
import logo from '../assets/restaurant-icon.png';
import '../css/Header.css';
import NavBar from './NavBar';

function Header() {
    
    useEffect(() => {
        const header = document.querySelector('.header');
        if (header) {
            setTimeout(() => {
                header.classList.add('loaded'); // trigger transition
            }, 100); // small delay to ensure CSS applies
        }
    }, []); // empty dependency array means this runs once on mount

    return (
        <header className='header'>
            <div className='brand'>
                <img src={logo} alt='Company Logo' className='logo'/>
                <h1 className='site-title'>Restaurant Name</h1>
                <NavBar/>
            </div>
        </header>
    );
}

export default Header;
