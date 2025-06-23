import './notfound.css';

import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1 className="error-title">Page not found</h1>
                <p className="error-message">Oops! It seems that this page does not exist.</p>
                <Link to="/" className='home-button'>Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound;