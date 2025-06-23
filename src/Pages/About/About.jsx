import "./about.css";

import { FaArrowUpWideShort } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineHighQuality } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";

function About() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>About Our Store</h1>
                <p>Making shopping convenient, fast, and secure</p>
            </section>

            <section className="about-content">

                <div className="about-card">
                    <h2>Our Mission</h2>
                    <p>
                        We created this store to provide you with the best products
                        at affordable prices. Our goal is to make your shopping
                        experience enjoyable and hassle-free.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Why Choose Us?</h2>
                    <p><FaArrowUpWideShort /> Wide product selection</p>
                    <p><TbTruckDelivery /> Fast delivery</p>
                    <p><MdOutlineHighQuality /> Quality guarantee</p>
                    <p><MdContactSupport /> 24/7 customer support</p>
                </div>

                <div className="about-card">
                    <h2>Our Team</h2>
                    <p>
                        We're a group of enthusiasts united by our love for technology
                        and quality service. Every day we work to improve
                        your shopping experience.
                    </p>
                </div>
            </section>

            <section className="about-contacts">
                <h2>Contact Us</h2>
                <p>Email: support@estore.example.com</p>
                <p>Phone: +1 (123) 456-7890</p>
            </section>
        </div>
    );
}

export default About;