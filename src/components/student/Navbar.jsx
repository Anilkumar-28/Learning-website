import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"; 
import { AppContext } from "../../context/AppContext";

const Navbar = () => {

  const {navigate, isEducator} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className={`navbar ${isCourseListPage ? 'bg-white' : 'bg-cyan'}`}>
      <img onClick={() => navigate('/')}src={assets.logo} alt="Logo" className="navbar-logo" />

      <div className="navbar-links desktop-only">
        {user && (
          <>
            {/* <button onClick={() => {navigate('/educator')}}className="link-btn">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
            <span className="separator">|</span> */}
            <Link to="/my-enrollments" className="link-btn">My Enrollments</Link>
          </>
        )}
        {user ? ( <UserButton />) : (
          <button onClick={() => openSignIn()} className="signup-btn"> Create Account
          </button>
        )}
      </div>

      <div className="navbar-links mobile-only">
        {user && (
          <>
            <button onClick={() => {navigate('/educator')}}className="link-btn small">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
            <span className="separator">|</span>
            <Link to="/my-enrollments" className="link-btn small">My Enrollments</Link>
          </>
        )}
        {user ? <UserButton /> : 
          <button onClick={() => openSignIn()} className="icon-btn">
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
