import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header>
        <h3>
          Trang cá nhân
        </h3>
      </header>
      <p>
        <strong>Người dùng:</strong> {currentUser.username}
      </p>

      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Vai trò:</strong> {currentUser.role}
    </div>
  );
};

export default Profile;