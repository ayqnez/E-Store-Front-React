import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Redux/Reducers/userReducer';

function UserProfile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser());
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    const formatDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString))) return "Not specified";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-content">

                    <div className="avatar-circle">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>

                    <div className="profile-info-section">

                        <h1 className="profile-greeting">Hi, {user.username || 'User'}!</h1>

                        <div className="profile-details">

                            <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{user.email || "N/A"}</span>
                            </div>

                        </div>

                        <div className="profile-actions">
                            <button className="edit-button">Edit Profile</button>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;