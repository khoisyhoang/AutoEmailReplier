const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { Firestore } = require("@google-cloud/firestore");

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("./firebase-service.json")),
  projectId: "repliesai-22011",
  databaseURL: "https://repliesai-22011-default-rtdb.firebaseio.com",
  storageBucket: "repliesai-22011.appspot.com",
});

const auth = admin.auth();
const db = new Firestore();
const usersCollection = db.collection("users");
const emailsCollection = db.collection("emails");

// Initialize Google OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Middleware to Verify Firebase Token
const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ error: "Unauthorized" });
  }
};

// Google OAuth Redirect
app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "profile",
      "email",
    ],
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code; // ✅ Get code from query params
  if (!code)
    return res.status(400).json({ error: "No authorization code provided" });

  try {
    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI, // Ensure correct redirect
    });

    oauth2Client.setCredentials({ access_token: tokens.access_token });

    // ✅ Fetch user profile from Google
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    console.log("erm.....");

    // ✅ Get existing Firestore user (to keep old refresh token if missing)
    const userRef = usersCollection.doc(userInfo.email);
    const userDoc = await userRef.get();

    console.log("what the sigma");

    let refreshToken = tokens.refresh_token || null; // Set to `null` if missing

    // ✅ If the refresh token is missing, keep the old one from Firestore
    if (!refreshToken && userDoc.exists) {
      const oldUserData = userDoc.data();
      refreshToken = oldUserData.refreshToken || null; // Keep existing refresh token
    }

    // ✅ Store user data in Firestore
    await userRef.set(
      {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: tokens.access_token,
        refreshToken, // ✅ Now always defined (even if `null`)
        lastLogin: new Date(),
      },
      { merge: true }
    );

    // ✅ Redirect to frontend with user details
    res.redirect(
      `http://localhost:3000/dashboard?email=${userInfo.email}&token=${tokens.access_token}`
    );
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error
    );
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// Fetch Emails and Save to Firestore
app.get("/emails", verifyFirebaseToken, async (req, res) => {
  const userEmail = req.user.email;
  const accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res.status(401).json({ error: "Access token required" });

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });
    const messages = await gmail.users.messages.list({ userId: "me" });

    // Save emails to Firestore
    const emailRef = emailsCollection.doc(userEmail);
    await emailRef.set(
      { emails: messages.data.messages || [] },
      { merge: true }
    );

    res.json({ emails: messages.data });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

// Retrieve Emails from Firestore
app.get("/emails-from-db", async (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) return res.status(400).json({ error: "User email required" });

  try {
    const emailRef = emailsCollection.doc(userEmail);
    const emailDoc = await emailRef.get();

    if (!emailDoc.exists)
      return res.status(404).json({ error: "No emails found" });

    res.json({ emails: emailDoc.data().emails });
  } catch (error) {
    console.error("Error retrieving emails from Firestore:", error);
    res.status(500).json({ error: "Failed to retrieve emails" });
  }
});

app.listen(8000, () =>
  console.log(
    `Backend running on port 8000, ${process.env.GOOGLE_CLIENT_ID} ${process.env.GOOGLE_CLIENT_SECRET} ${process.env.GOOGLE_REDIRECT_URI} ${process.env.FIREBASE_PROJECT_ID} ${process.env.FIREBASE_CLIENT_EMAIL} ${process.env.FIREBASE_PRIVATE_KEY}`
  )
);
