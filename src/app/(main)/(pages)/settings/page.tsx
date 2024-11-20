import ProfileForm from '@/components/forms/profile-form';
import React from 'react';
import ProfilePicture from './_components/profile-picture';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

type Props = {};

const Settings = async (props: Props) => {
  const authResult = await auth(); // Await the result of the auth() function
  const userId = authResult?.userId; // Extract userId from the resolved object

  if (!userId) return null;

  const user = await db.user.findUnique({ where: { clerkId: userId } });

  const removeProfileImage = async () => {
    'use server';
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: '',
      },
    });
    return response;
  };

  const uploadProfileImage = async (image: string) => {
    'use server';
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: image,
      },
    });

    return response;
  };

  const updateUserInfo = async (name: string) => {
    'use server';

    const updateUser = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        name,
      },
    });
    return updateUser;
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
          userImage={user?.profileImage || ''}
          onUpload={uploadProfileImage}
        />
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
