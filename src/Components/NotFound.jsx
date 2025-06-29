import './notfound.css';
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code"><TbError404 /></div>
                <h1 className="error-title">Page not found</h1>
                <p className="error-message">Oops! It seems that this page does not exist.</p>
                <Link to="/" className='home-button'>Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound;