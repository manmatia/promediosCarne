import React, { useEffect } from 'react';
import { useUser, UserButton } from "@clerk/clerk-react";
import { useDispatch } from 'react-redux';
import { postUsers } from '../../redux/Actions';
import { Link } from 'react-router-dom';
import userIcon from "../../assets/images/user_icon.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./User.css"

const User = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      dispatch(postUsers(user.id, user, user.fullName));
    }
  }, [user, dispatch]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="d-flex align-items-center justify-content-center p-2 rounded-circle">
        <Link to="https://assured-rhino-35.accounts.dev/sign-in">
          <button className="btn btn-primary">
            <img src={userIcon} alt="Icono de usuario por defecto" className="img-fluid user-icon" />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center p-2 rounded-circle">
      <UserButton />
    </div>
  );
};

export default User;
