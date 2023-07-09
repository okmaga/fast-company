import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import { useSelector } from "react-redux";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
  if (!currentUser) return "loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img src={currentUser.image}
          alt=""
          className="img-responsive rounded-circle"
          height="40"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
        <Link to="/logout" className="dropdown-item">Log out</Link>
      </div>
    </div>
  );
};

export default NavProfile;
