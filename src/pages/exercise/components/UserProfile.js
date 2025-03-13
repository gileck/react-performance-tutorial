import React, { useState, useCallback } from 'react';
import { useAppContext } from './AppContext';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const UserProfile = () => {
  console.log('UserProfile rendering');
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  
  // Problem: Missing dependency in useCallback
  // This function uses editedUser but doesn't include it in the dependency array
  const handleSave = useCallback(() => {
    setUser(editedUser);
    setIsEditing(false);
    
    // Simulate API call to save user data
    console.log('Saving user data:', editedUser);
  }, []); // Missing dependencies: editedUser
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return highlightUpdates(
    <div className={styles.userProfile}>
      {isEditing ? (
        <div className={styles.editForm}>
          <h3>Edit Profile</h3>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.profileView}>
          <h3>User Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
