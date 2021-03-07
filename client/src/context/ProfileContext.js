import React, { useState, createContext } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profileData, setProfileData] = useState({
    posts: [],
    profile: null,
    loading: true,
  });

  return (
    <ProfileContext.Provider value={[profileData, setProfileData]}>
      {props.children}
    </ProfileContext.Provider>
  );
};
