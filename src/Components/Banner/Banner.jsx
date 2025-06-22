import './banner.css'

function Banner() {
    return (
        <>
            <div className="banner-container">
                <div className="banner-content">
                    <p className='banner-info'>Iphone 14 <strong>Pro</strong></p>
                    <p>Created to change everything for the better. For everyone</p>
                    <button className='banner-btn'>Shop Now</button>
                </div>

                <div className="banner-logo">
                    <img src="./img/iphone-image.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Banner;