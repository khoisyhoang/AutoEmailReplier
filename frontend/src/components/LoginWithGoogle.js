import React from "react";

const LoginWithGoogle = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <button
      className="w-full py-2 bg-blue-500 text-white rounded-lg mb-4"
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
};

export default LoginWithGoogle;
