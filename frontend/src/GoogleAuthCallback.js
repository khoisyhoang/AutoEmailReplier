import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      window.location.href = `http://localhost:8000/auth/google/callback?code=${code}`; // ✅ Send code as query param
    }
  }, [code]);

  return <p>Authenticating...</p>;
};

export default GoogleAuthCallback;
