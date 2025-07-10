import { useNavigate } from 'react-router-dom';
import './banner.css'

function Banner() {
    const navigate = useNavigate();

    return (
        <>
            <div className="banner-container">
                <div className="banner-content">
                    <p className='banner-info'>Iphone 14 <strong>Pro</strong></p>
                    <p>Created to change everything for the better. For everyone</p>
                    <button className='banner-btn' onClick={() => navigate("/product/15")}>Shop Now</button>
                </div>

                <div className="banner-logo">
                    <img src="./img/iphone-image.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Banner;