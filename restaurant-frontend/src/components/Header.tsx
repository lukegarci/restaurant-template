import logo from '../assets/temp_logo.png';
import '../css/Header.css';
import NavBar from './NavBar';

function Header(){
    return(
        <header className='header'>
            <div className='brand'>
                <img src={logo} alt='Company Logo' className='logo'/>
                <h1 className='site-title'>Restaurant Name</h1>
                <NavBar/>
            </div>
        </header>


    )
};

export default Header;