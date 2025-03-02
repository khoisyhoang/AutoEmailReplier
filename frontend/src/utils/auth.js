import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken(); // Firebase token

    console.log("Firebase ID Token:", idToken);
    return { user, idToken };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};
