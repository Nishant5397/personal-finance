import React, { useEffect } from 'react';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import userSvg from "../../assets/user.svg";
import { toast } from 'react-toastify';

function Header() {
  const [user,loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("logged out successfully!!");
          navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message); 
    }

  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  return (
    <div className='navbar' >
      <p className='logo'>Financely.</p>
      {user && (
        <p 
        className='logo link' 
        onClick={logoutFnc}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          Logout</p>
      )}

    </div>
  )
}

export default Header;