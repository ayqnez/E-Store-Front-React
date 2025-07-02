import { useDispatch, useSelector } from 'react-redux';
import './address.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAddresses } from '../../../Redux/Reducers/addressReducer';

function Address() {
    const [address, setAddress] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addresses = useSelector((state) => state.address.addresses)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch])

    return (
        <div className="address-page">

            <h1 className="address-title">Select Address</h1>

            <div className="address-progress">
                <div className="address-step address-step-active">Step 1</div>
                <div className="address-step">Shipping</div>
                <div className="address-step">Payment</div>
            </div>

            <div className="address-options">
                {addresses.map((addr) => (
                    <div className={`address-card ${address?.id === addr.id ? 'active' : ''}`} key={addr.id} onClick={() => setAddress(addr)}>
                        <h2 className="address-card-title">{addr.country}</h2>
                        <p className="address-card-text">{addr.street} {addr.city}</p>
                        <p className="address-card-text">{addr.postalCode}</p>
                    </div>
                ))}
            </div>

            <div className="address-divider"></div>

            <button className="address-add-button">Add New Address</button>

            <div className="address-navigation">
                <button className="address-button address-back-button" onClick={() => navigate("/cart")}>Back</button>
                <button className="address-button address-next-button" onClick={() => navigate("/shipping")}>Next</button>
            </div>
        </div>
    );
}

export default Address;