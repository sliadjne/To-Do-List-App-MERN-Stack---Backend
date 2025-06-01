import React, { useEffect, useState } from "react";
import { logout } from "../services/authService";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <nav className="flex w-full justify-between items-center bg-blue-100 shadow-md py-3 px-10">
      {/* Logo */}
      <div className="flex gap-1 justify-center items-center cursor-pointer">
        <p className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition ease-in-out">
          ToDoSome
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-blue-900 font-semibold">
        <a href="#" className="text-sm">
          My ToDo
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user?.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-semibold">
                {user.email.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-pink-500 transition ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/signin"
            className="bg-blue-800 text-white text-sm py-2 px-6 rounded-md hover:bg-blue-700 transition ease-in-out"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
