import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or your auth storage
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <>
      <button
        className="btn-logout"
        onClick={() => setShowLogoutModal(true)}
      >
        Logout
      </button>

      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="modal-title">Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
