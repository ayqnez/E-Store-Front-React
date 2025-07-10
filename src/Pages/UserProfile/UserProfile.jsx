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
    }

    return (
        <div className="profile-page">
            {user ? (
                <div className="profile-card">

                    <div className="profile-avatar">
                        <span>{user.username?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>

                    <h1 className="profile-name">Hi, {user.username || 'User'}!</h1>

                    <div className="profile-info">
                        <div className="profile-item">
                            <span className="label">Email:</span>
                            <span className="value">{user.email || "N/A"}</span>
                        </div>
                    </div>

                    <div className="profile-buttons">
                        <button className="btn edit">Edit Profile</button>
                        <button className="btn logout" onClick={handleLogout}>Logout</button>
                    </div>

                </div>
            ) : (
                <div className="profile-loading">
                    <div className="spinner"></div>
                    <p>Loading profile...</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
