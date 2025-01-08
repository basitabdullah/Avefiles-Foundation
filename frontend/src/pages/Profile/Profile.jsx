import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import './Profile.scss';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h1>My Profile</h1>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>
              <FaUser />
              <span>Name</span>
            </label>
            <p>{user.name}</p>
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope />
              <span>Email</span>
            </label>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 