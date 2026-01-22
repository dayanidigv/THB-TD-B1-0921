import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('🚪 User clicked logout');
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '120px', height: '120px', fontSize: '48px' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <h2>{user.name}</h2>
              </div>

              <div className="mb-4">
                <div className="row mb-3">
                  <div className="col-4 text-muted">Email:</div>
                  <div className="col-8">{user.email}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 text-muted">User ID:</div>
                  <div className="col-8">
                    <code>{user.id}</code>
                  </div>
                </div>
                {user.createdAt && (
                  <div className="row mb-3">
                    <div className="col-4 text-muted">Member since:</div>
                    <div className="col-8">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
