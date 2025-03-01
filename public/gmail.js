const CLIENT_ID = '873164084938-t7blmmt3hvauhtsgcdf84qepcteibsi0.apps.googleusercontent.com';
let API_KEY = '';

function read_json(path, mode)
{
    return fetch(path)
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("Response threw error: " + res.status)
        }
        return res.arrayBuffer();
    })
    .then((data) => {
        const decoder = new TextDecoder(mode);
        const text = decoder.decode(data);
        return JSON.parse(text);
    })
    .catch((err) => {
        throw new Error(err)
    })
}

read_json('key.json', 'utf8')
.then((data) => {
    API_KEY = data.key;
})

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listMessages(); // Changed to listMessages
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

function base64UrlToBase64(base64Url) {
    return base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')  
      .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=' );
  }

/**
 * Print all Messages in the authorized user's inbox. If no messages
 * are found an appropriate message is printed.
 */
async function listMessages() {
  let response;
  try {
    response = await gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'q': 'from:me newer_than:60d'
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const messages = response.result.messages;
  if (!messages || messages.length == 0) {
    document.getElementById('content').innerText = 'No unread messages found.';
    return;
  }

  // Fetch message details (like subject, sender) for each message
  const messageDetailsPromises = messages.map(async (message) => {
    const msgResponse = await gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': message.id
    });

    const messageData = msgResponse.result;
    const headers = messageData.payload.headers;
    const subject = headers.find(header => header.name === 'Subject')?.value;
    const id  = message.id;

    let body = '';
    if (messageData.payload.parts) {
      // Check for parts
      messageData.payload.parts.forEach(part => {
        if (part.mimeType === 'text/plain') {
          body = part.body.data;
        }
      });
    } else {
      // If the email is not multipart, take the plain text body
      body = messageData.payload.body.data;
    }

    body = base64UrlToBase64(body);
    body = decodeURIComponent(escape(atob(body)));

    return {
      subject: subject || 'No Subject',
      body: body || "No body",
      id: id || "No id"
    };
  });

  const messageDetails = await Promise.all(messageDetailsPromises);
  console.log(messageDetails);

//   // Display the message details in the content section
//   const output = messageDetails.reduce(
//     (str, msg) => `${str}ID: ${msg.id}\nSubject: ${msg.subject}\nFrom: ${msg.from}\n\n`,
//     'Unread Messages:\n\n'
//   );

//   document.getElementById('content').innerText = output;
}
