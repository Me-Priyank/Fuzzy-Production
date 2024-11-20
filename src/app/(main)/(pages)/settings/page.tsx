'use client';

import ProfileForm from '@/components/forms/profile-form';
import React from 'react';
import ProfilePicture from './_components/profile-picture';
import { useAuth, useUser } from '@clerk/nextjs';

type Props = {};

const Settings = (props: Props) => {
  const { userId } = useAuth(); // Get the authenticated user ID
  if (!userId) return null;

  const { user } = useUser(); // Fetch detailed user data
  if (!user) return null; 

  // Function to remove profile image
  const removeProfileImage = () => {
    fetch('/api/user/remove-profile-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile image removed:', data);
      })
      .catch(error => {
        console.error('Error removing profile image:', error);
      });
  };

  // Function to upload a new profile image
  const uploadProfileImage = (image: string) => {
    fetch('/api/user/upload-profile-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, image }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile image uploaded:', data);
      })
      .catch(error => {
        console.error('Error uploading profile image:', error);
      });
  };

  // Function to update user information
  const updateUserInfo = (name: string) => {
    fetch('/api/user/update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User info updated:', data);
      })
      .catch(error => {
        console.error('Error updating user info:', error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">Add or update your information</p>
        </div>
        <ProfilePicture
          onDelete={removeProfileImage}
          userImage= {''}
          onUpload={uploadProfileImage}
        />
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
