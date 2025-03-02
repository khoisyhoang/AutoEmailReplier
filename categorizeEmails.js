const fs = require("fs");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store API Key in .env file

const USE_EMBEDDINGS = false; // Disable embeddings for faster testing
const BATCH_SIZE = 5; // Classify 5 emails at once to reduce token usage

/**
 * Batch classifies emails into Casual, Neutral, or Formal using GPT-3.5 (cheaper)
 */
async function classifyEmailsBatch(emailTexts) {
    const prompt = `Classify each of the following emails as "Casual", "Neutral", or "Formal".
    
    ${emailTexts.map((text, index) => `Email ${index + 1}: ${text}`).join("\n\n")}
    
    Return the classifications in a list format, like this:
    - Email 1: Casual
    - Email 2: Formal
    - Email 3: Neutral
    `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Cheaper than GPT-4o
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.split("\n").map(line => line.split(": ")[1].trim());
    } catch (error) {
        console.error("Error classifying emails:", error);
        return emailTexts.map(() => "Neutral"); // Default to Neutral if API fails
    }
}

/**
 * Categorizes emails into Casual, Neutral, and Formal in batches (efficient)
 */
async function categorizeEmails(emailList) {
    let categorizedEmails = { "Casual": [], "Neutral": [], "Formal": [] };

    for (let i = 0; i < emailList.length; i += BATCH_SIZE) {
        const batch = emailList.slice(i, i + BATCH_SIZE);
        const batchTexts = batch.map(email => email.body);

        const categories = await classifyEmailsBatch(batchTexts);

        batch.forEach((email, index) => {
            categorizedEmails[categories[index]].push(email);
        });
    }

    return categorizedEmails;
}

/**
 * Selects the Top 5 Emails per category (Simplified for 10-test emails)
 */
function getTopEmails(categorizedEmails) {
    let rankedEmails = {};

    for (let category in categorizedEmails) {
        let emails = categorizedEmails[category];

        rankedEmails[category] = emails.slice(0, 5); // Pick the first 5 emails (or all if fewer exist)
    }

    return rankedEmails;
}

/**
 * Main function to process test emails
 */
async function processEmails(emailList) {
    console.log("🔍 Categorizing emails...");
    let categorizedEmails = await categorizeEmails(emailList);

    console.log("📊 Selecting Top 5 emails per category...");
    let topEmails = getTopEmails(categorizedEmails);

    // Save JSON files
    fs.writeFileSync("Casual.json", JSON.stringify(topEmails["Casual"], null, 2));
    fs.writeFileSync("Neutral.json", JSON.stringify(topEmails["Neutral"], null, 2));
    fs.writeFileSync("Formal.json", JSON.stringify(topEmails["Formal"], null, 2));

    console.log("✅ JSON files saved: Casual.json, Neutral.json, Formal.json");

    return topEmails;
}

// Sample Test JSON (10 Emails)
const testEmails = [
    { subject: "Lunch Plans?", body: "Hey team, should we grab lunch at the usual place today?" },
    { subject: "Project Update", body: "Please find the latest project updates attached for your review." },
    { subject: "Important Notice", body: "This is a formal notice regarding the upcoming policy changes." },
    { subject: "Weekend Trip", body: "Who's up for a quick weekend trip? Thinking about heading to the beach!" },
    { subject: "Quarterly Report Submission", body: "All department heads, please submit your quarterly reports by Friday." },
    { subject: "Code Review", body: "Can someone take a look at my latest PR when they get a chance?" },
    { subject: "Team Meeting Agenda", body: "The agenda for our upcoming team meeting is attached. Please review before the call." },
    { subject: "Casual Friday Plans", body: "Hey folks, what’s the plan for casual Friday? Thinking about pizza in the break room!" },
    { subject: "HR Compliance Reminder", body: "All employees must complete their annual HR compliance training by the end of the month." },
    { subject: "Social Event", body: "Join us for a company-wide happy hour this Thursday evening!" }
];

// Run with Test Data
processEmails(testEmails);
