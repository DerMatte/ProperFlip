'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  company_name: string | null;
  role: string | null;
}

interface UserProfileProps {
  user: User;
  initialProfile?: Profile;
}

export default function UserProfile({ user, initialProfile }: UserProfileProps) {
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    id: user.id,
    first_name: initialProfile?.first_name || '',
    last_name: initialProfile?.last_name || '',
    phone_number: initialProfile?.phone_number || '',
    company_name: initialProfile?.company_name || '',
    role: initialProfile?.role || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile,
      });

    if (!error) {
      setIsEditing(false);
    } else {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                value={profile.first_name || ''}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                value={profile.last_name || ''}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                type="tel"
                value={profile.phone_number || ''}
                onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company_name">Company Name</label>
              <input
                id="company_name"
                type="text"
                value={profile.company_name || ''}
                onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                value={profile.role || ''}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 w-fit"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">First Name</p>
            <p>{profile.first_name || '-'}</p>
          </div>
          <div>
            <p className="font-semibold">Last Name</p>
            <p>{profile.last_name || '-'}</p>
          </div>
          <div>
            <p className="font-semibold">Phone Number</p>
            <p>{profile.phone_number || '-'}</p>
          </div>
          <div>
            <p className="font-semibold">Company Name</p>
            <p>{profile.company_name || '-'}</p>
          </div>
          <div>
            <p className="font-semibold">Role</p>
            <p>{profile.role || '-'}</p>
          </div>
        </div>
      )}
    </div>
  );
} 