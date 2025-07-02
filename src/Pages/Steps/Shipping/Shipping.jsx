import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './shipping.css';

function Shipping() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('free');
    const [scheduledDate, setScheduledDate] = useState('');

    return (
        <div className="shipping-page">

            <h1 className="shipping-title">Select Shipment Method</h1>

            <div className="shipping-progress">
                <div className="shipping-step">Address</div>
                <div className="shipping-step shipping-step-active">Step 2</div>
                <div className="shipping-step">Payment</div>
            </div>

            <div className="shipping-options">
                <div
                    className={`shipping-option ${selected === 'free' ? 'active' : ''}`}
                    onClick={() => setSelected('free')}
                >
                    <div>
                        <input type="radio" name="shipping" checked={selected === 'free'} readOnly />
                        <span className="shipping-label">Free</span> <span>Regular shipment</span>
                    </div>
                    <div className="shipping-date">17 Oct, 2023</div>
                </div>

                <div
                    className={`shipping-option ${selected === 'express' ? 'active' : ''}`}
                    onClick={() => setSelected('express')}
                >
                    <div>
                        <input type="radio" name="shipping" checked={selected === 'express'} readOnly />
                        <span className="shipping-label">$8.50</span> <span>Get your delivery as soon as possible</span>
                    </div>
                    <div className="shipping-date">1 Oct, 2023</div>
                </div>

                <div
                    className={`shipping-option ${selected === 'schedule' ? 'active' : ''}`}
                    onClick={() => setSelected('schedule')}
                >
                    <div>
                        <input type="radio" name="shipping" checked={selected === 'schedule'} readOnly />
                        <span className="shipping-label">Schedule</span> <span>Pick a date when you want to get your delivery</span>
                    </div>
                    <div className="shipping-date">
                        <select
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            disabled={selected !== 'schedule'}
                        >
                            <option value="">Select Date</option>
                            <option value="2023-10-05">5 Oct, 2023</option>
                            <option value="2023-10-10">10 Oct, 2023</option>
                            <option value="2023-10-15">15 Oct, 2023</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="shipping-navigation">
                <button className="shipping-button shipping-back-button" onClick={() => navigate("/address")}>Back</button>
                <button className="shipping-button shipping-next-button" onClick={() => navigate("/payment")}>Next</button>
            </div>

        </div>
    );
}

export default Shipping;
