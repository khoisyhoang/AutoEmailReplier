import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/gmail.readonly");

export const signInWithGoogle = async () => {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idToken = await user.getIdToken(); // Firebase token

  console.log("Firebase ID Token:", idToken);
  return { user, idToken };
};