import { useFormData } from "./Mail";

export async function GenerateReply() {
    // Get the email that is being responded to
    let objectReceive = useFormData();

    // Make sure objectReceive has the necessary fields (subject, content)
    if (!objectReceive || !objectReceive.subject || !objectReceive.content) {
        console.error("Error: Missing subject or content in objectReceive.");
        return;
    }

    // Create a test email with objectReceive details (the email being responded to)
    const testEmails = [
        {
            subject: objectReceive.subject,
            body: objectReceive.content
        }
    ];

    // Example of the new email for which a reply is being generated
    const newEmail = {
        subject: "Request for Product Demo",
        body: "Hello, I am interested in your software and would like to schedule a demo. Please let me know your availability. Thanks!"
    };

    const apiKey = "";  // Replace with actual API key  
    const formality = "professional";  // Define the formality of the email

    // Format the testEmails to use as writing style references
    let emailHistory = testEmails.map((email, index) => 
        `Email ${index + 1}:\nSubject: ${email.subject}\nBody: ${email.body}`
    ).join("\n\n");

    let name = "Khoi"; // The name of the person responding

    const messages = [
        {
            role: "system", 
            content: `You are an AI assistant that generates professional email responses. 
            Use the following past emails as a reference to mimic the user's writing style. Do not generate the Subject section. You are responding to the following email: ${objectReceive.content}`
        },
        {
            role: "user", 
            content: `You are responding for ${name}. Here are my previous emails: ${emailHistory}. Mimic the style as closely as possible and write a response to the previous email.`
        }
    ];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",  // You can adjust this to use the desired model
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
