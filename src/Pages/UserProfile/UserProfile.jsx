import './profile.css'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Redux/Reducers/userReducer';
import { clearFavorites } from '../../Redux/Reducers/favoriteReducer';

function UserProfile() {
    const user = useSelector((state) => state.user.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser());
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    return (
        <>
            <div className="profile-container">
                <h1 className="profile-header">My Profile</h1>

                {user ? (
                    <div className="profile-info">
                        <div className="profile-row">
                            <span className="profile-label">Username:</span>
                            <span className="profile-value">{user.username}</span>
                        </div>
                        <div className="profile-row">
                            <span className="profile-label">Email:</span>
                            <span className="profile-value">{user.email || "N/A"}</span>
                        </div>

                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default UserProfile;