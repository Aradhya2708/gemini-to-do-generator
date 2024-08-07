// fetch, process

import { google } from 'googleapis';
// import axios from 'axios';

const OAuth2 = google.auth.OAuth2;

const fetchEmails = async (req, res) => {
    // res.send("fetching emails")
    try {
        const user = req.user; // Assuming you have a middleware that sets req.user from session
        const oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
        oauth2Client.setCredentials(user.tokens);

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        // Fetch user's emails
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: user.config.emailsToScan, // Adjust as needed
        });

        const messageIds = response.data.messages.map(message => message.id);

        // Fetch email details
        const emailPromises = messageIds.map(id => 
            gmail.users.messages.get({ userId: 'me', id })
        );
        const emailDetails = await Promise.all(emailPromises);

        // Extract necessary information
        const emailData = emailDetails.map(email => ({
            subject: email.data.payload.headers.find(header => header.name === 'Subject')?.value,
            body: email.data.snippet,
        }));

        // // Send emails to LLM (Replace this with actual LLM API call) // needs changes
        // const llmResponse = await axios.post('https://api.llm.example.com/generate-todo', {
        //     emails: emailData,
        // });

        // Send the to-do list back to the client
        res.json(llmResponse.data);
    } catch (error) {
        console.error('Error fetching and processing emails:', error);
        res.status(500).send('Failed to process emails');
    }
};

export { fetchEmails };
