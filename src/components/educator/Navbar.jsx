import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="edunavbar">
      <Link to="/" className="edunavbar-logo">
        <img src={assets.logo} alt="logo" />
      </Link>
      <div className="edunavbar-right">
        <p className="edunavbar-greeting">Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? ( <UserButton />) : (<img className="edunavbar-profile-img" src={assets.profile_img} alt="profile" /> )}
      </div>
    </div>
  );
};

export default Navbar;
