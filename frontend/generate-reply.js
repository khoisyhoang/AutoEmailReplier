async function testGenerateReply() {
    const testEmails = [
        {
            subject: "Project Deadline Reminder",
            body: `Dear Ted,

            I hope this email finds you well. I wanted to follow up on my application for the Software Engineer position at Theranos, submitted on 2/25/25. I am very excited about the opportunity to contribute to your team and would love to learn more about the hiring process.

            Please let me know if you need any additional information from me. I look forward to the possibility of discussing my qualifications further. Thank you for your time and consideration.

            Best regards,
            Tom`
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
    let name = "Ted";

    const messages = [
        { role: "system", content: `You are an AI assistant that generates professional email responses. 
        Use the following past emails as a reference to mimic the user's writing style.` },
        // { role: "user", content: `Here are my previous emails:\n\n${emailHistory}\n\nBased on my past emails, generate a ${formality} response to this new email:\n\nSubject: ${newEmail.subject}\nBody: ${newEmail.body}` }
        { role: "user", content: `You are responding for ${name}, here are my previous emails: ${emailHistory}, mimic the style as close as possible and write a response to the previous email.`}
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
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call this function to test
testGenerateReply();
