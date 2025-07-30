import '../css/Footer.css';
import insta from '../assets/Instagram_Glyph_Gradient.png';
import fb from '../assets/Facebook_Logo_Primary.png';


function Footer() {
    return (
        <footer className="footer">
            <div className='footer-content'>
                <div className='location'>
                    <div className='location-info'>
                        <h2>Location</h2>
                        <a href="https://www.google.com/maps?q=800+SW+10th+Ave,+Portland,+OR+97205" target="_blank" rel="noopener noreferrer">
                            <p>800 SW 10th Ave, Portland, OR 97205</p>
                            <p>Portland, OR</p>
                            <p>97205</p>
                        </a>
                    </div>
                </div>
                <div className='hours'>
                    <h2>Hours</h2>
                    <p>Days of the week</p>
                    <p>9:00 AM - 5:00 PM</p>
                </div>
                <div className='socials'>
                    <h2>Social Media</h2>
                    <div className='social-icons'>
                        <a href="https://www.instagram.com/luke.garci" target='_blank' rel='noopener noreferrer'>
                            <img src={insta} alt="Instagram" className='insta-icon'/>
                        </a>
                        <a href="https://www.facebook.com/luke.garci21" target='_blank' rel='noopener noreferrer'>
                            <img src={fb} alt="Facebook" className='fb-icon'/>
                        </a>                
                    </div>
                </div>
                <div className='contact'>
                    <h2>Contact Info</h2>
                    <div className='contact-info'>
                        <a href="tel:4802441670">
                            <p>480-244-1670</p>
                        </a>
                        <a href="mailto:lukegarci@gmail.com">
                            <p>lukegarci@gmail.com</p>
                        </a>                
                    </div>
                </div>
            </div>
            <div className="copyright">
                <img src="/boujee_logo.jpeg" alt="Boujee logo" className="footer-logo" />
                <p>&copy; 2025 Boujee. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
