import React, { useState } from "react";
import { signInWithGoogle } from "../utils/auth";
import LoginWithGoogle from "./LoginWithGoogle";

const Registration = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  // const [error, setError] = useState("");
  const [user, setUser] = useState(null); // To store user data from Google sign-in

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Passwords do not match!");
  //     return;
  //   }
  //   setError("");
  //   console.log("Registration successful:", formData);
  // };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const { user, idToken } = await signInWithGoogle();
      setUser(user); // Store the signed-in user
      console.log("Google User:", user);
      console.log("Google ID Token:", idToken);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FCFEEF]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {/* Google sign-in button */}
        <LoginWithGoogle />

        {/* Display user name if signed in */}
        {user && (
          <p className="text-center text-green-500">
            Welcome, {user.displayName}
          </p>
        )}
        {/* Registration form */}
      </div>
    </div>
  );
};

export default Registration;
