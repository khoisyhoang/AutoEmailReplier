const fetchEmails = async () => {
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    console.error("No user email found. Please log in.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/emails?email=${userEmail}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log("Fetched Emails from Firestore:", data);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
};
