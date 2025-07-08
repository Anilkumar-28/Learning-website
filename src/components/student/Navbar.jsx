import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"; 

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className={`navbar ${isCourseListPage ? 'bg-white' : 'bg-cyan'}`}>
      <img src={assets.logo} alt="Logo" className="navbar-logo" />

      <div className="navbar-links desktop-only">
        {user && (
          <>
            <button className="link-btn">Become Educator</button>
            <span className="separator">|</span>
            <Link to="/my-enrollments" className="link-btn">My Enrollments</Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="signup-btn">
            Create Account
          </button>
        )}
      </div>

      <div className="navbar-links mobile-only">
        {user && (
          <>
            <button className="link-btn small">Become Educator</button>
            <span className="separator">|</span>
            <Link to="/my-enrollments" className="link-btn small">My Enrollments</Link>
          </>
        )}
        {user ? 
          <UserButton />
         : 
          <button onClick={() => openSignIn()} className="icon-btn">
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
