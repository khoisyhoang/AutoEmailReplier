const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("./firebase-service.json")),
});

const auth = admin.auth();

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ error: "Unauthorized" });
  }
};

app.get("/", async (req, res) => {
   let data = await listEmails();
   res.send(data);
});

app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.json({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

app.get("/emails", verifyFirebaseToken, async (req, res) => {
  const accessToken = req.headers["x-access-token"]; // Get token from frontend

  if (!accessToken) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });
    const messages = await gmail.users.messages.list({ userId: "me" });

    res.json({ emails: messages.data });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

const fetchEmails = async (idToken, accessToken) => {
  const response = await fetch("http://localhost:8000/emails", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`, // Firebase token
      "X-Access-Token": accessToken, // Google OAuth token
    },
  });

  const data = await response.json();
  console.log("Emails:", data);
};

app.listen(8000, () => {
  console.log("backend now running!");
});

const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Initialize Gmail API with proper auth instance
const gmail = google.gmail({ version: "v1", auth: oauth2Client });


async function listEmails() {
  const res = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['INBOX'],
    q: 'is:unread'
  });
  // console.log(res.data.messages);  
  return res;
}