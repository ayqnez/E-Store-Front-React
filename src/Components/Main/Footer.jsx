import './footer.css'
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-logo">
                        <Link>
                            <img src="/img/logo2.png" alt="" />
                        </Link>
                        <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>

                        <div className="footer-links">
                            <Link>
                                <FaWhatsapp />
                            </Link>
                            <Link>
                                <FaInstagram />
                            </Link>
                            <Link>
                                <IoLogoGithub />
                            </Link>
                        </div>
                    </div>

                    <div className="footer-services">
                        <h3>Services</h3>
                        <p>Bonus program</p>
                        <p>Gift cards</p>
                        <p>Credit and payment</p>
                    </div>

                    <div className="footer-services">
                        <h3>Assistance to the buyer</h3>
                        <p>Find an order</p>
                        <p>Terms of delivery</p>
                        <p>Exchange and return of goods</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;