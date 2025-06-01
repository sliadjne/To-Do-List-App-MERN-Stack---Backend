import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginWithEmail, loginWithGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import NavbarComponent from "../components/NavbarComponent";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password cannot be blank!");
      return;
    }

    try {
      await loginWithEmail(email, password);
      toast.success("Login success!");
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Invalid authentication!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Login via Google successfully!");
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Google login error");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen bg-blue">
        <h1 className="text-lg text-blue-400 font-semibold mb-4">
          Please login!
        </h1>
        <form className="flex flex-col gap-3 w-80" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-blue-700 bg-white-900 text-black p-2 rounded-md placeholder-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-blue-700 bg-white-900 text-black p-2 rounded-md placeholder-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <span className="my-4 text-sm font-bold text-blue-300">--- Or ---</span>

        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-400 transition"
        >
          Login with Google
        </button>
      </div>
    </>
  );
};

export default LoginPage;
