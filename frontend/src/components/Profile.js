// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/actions';

const Profile = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user ? user.name : '');
  const [profileImage, setProfileImage] = useState(user ? user.profileImage : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, profileImage }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
          />
        </div>
        <div>
          <label>Profile Image URL</label>
          <input 
            type="text" 
            value={profileImage} 
            onChange={(e) => setProfileImage(e.target.value)} 
            placeholder="Enter profile image URL" 
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
