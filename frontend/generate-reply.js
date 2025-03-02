async function testGenerateReply() {
    const testEmails = [
        {
            subject: "Project Deadline Reminder",
            body: "Hi, just a reminder that the project deadline is next Friday. Let me know if you need any help!"
        },
        {
            subject: "Meeting Reschedule Request",
            body: "Hey, can we move our meeting to Thursday instead of Wednesday? Let me know what works for you."
        },
        {
            subject: "Invoice Pending Confirmation",
            body: "Dear team, please confirm if the latest invoice has been processed. Looking forward to your update."
        },
        {
            subject: "Team Outing Poll",
            body: "Hello everyone, please vote on your preferred date for the team outing. Looking forward to a fun day!"
        },
        {
            subject: "Follow-up on Job Application",
            body: "Hi, I wanted to check in on the status of my job application. Please let me know if there are any updates!"
        }
    ];

    const newEmail = {
        subject: "Request for Product Demo",
        body: "Hello, I am interested in your software and would like to schedule a demo. Please let me know your availability. Thanks!"
    };

    const apiKey = "";  // Replace with actual API key
    const formality = "professional";

    // Format testEmails to use them as a writing style reference
    let emailHistory = testEmails.map((email, index) => 
        `Email ${index + 1}:\nSubject: ${email.subject}\nBody: ${email.body}`
    ).join("\n\n");

    const messages = [
        { role: "system", content: `You are an AI assistant that generates professional email responses. 
        Use the following past emails as a reference to mimic the user's writing style.` },
        { role: "user", content: `Here are my previous emails:\n\n${emailHistory}\n\nBased on my past emails, generate a ${formality} response to this new email:\n\nSubject: ${newEmail.subject}\nBody: ${newEmail.body}` }
    ];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: messages,
                max_tokens: 300
            })
        });

        const data = await response.json();
        console.log("Full API Response:", data);

        if (!data.choices || data.choices.length === 0) {
            console.error("Error: No valid response from AI.");
            return;
        }

        console.log("AI-Generated Reply:\n", data.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call this function to test
testGenerateReply();
