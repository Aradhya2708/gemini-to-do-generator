import { google } from 'googleapis';
import MailParser from 'mailparser'; // Import mailparser
import Todo from '../models/todo.model.js';

// gemini imports:
import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_A);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const OAuth2 = google.auth.OAuth2;

const fetchEmails = async (req, res) => {
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
			maxResults: 5 // user.config.emailsToScan, // Use the number of emails to scan from user config
		});

		const messageIds = response.data.messages.map((message) => message.id);

		for (let messageId of messageIds) {
			// Check if the emailId already exists in the database
			const existingTodo = await Todo.findOne({ emailId: messageId });
			if (existingTodo) {
				console.log(`Skipping email with ID ${messageId} as it already exists in the database.`);
				continue;
			}

			const message = await gmail.users.messages.get({
				userId: 'me',
				id: messageId,
				format: 'raw',
			});

			const raw = message.data.raw;
			const buffer = Buffer.from(raw, 'base64');
			const parsedEmail = await MailParser.simpleParser(buffer);
			const snippet =
				parsedEmail.text?.substring(0, 100) || 'No Body Content';
			const geminiResponse = await gemini_func(
				`From the given mail content, extract the task to do, if any. If no task to extract respond with "0", else respond with a single line, 20-30 words (unformatted, no *s or other stuff)statement describing the task at hand. Mail Content:- from: ${
					parsedEmail.from
				}, subject: ${parsedEmail.subject || 'No Subject'}, body: ${
					parsedEmail.text?.replace(/\r\n/g, '\n') ||
					'No Body Content'
				}`
			);

			const todo = new Todo({
				userId: user._id,
				from: parsedEmail.from.text,
				subject: parsedEmail.subject || 'No Subject',
				snippet: snippet || 'No Snippet Content',
				task: geminiResponse,
				emailId: messageId,
			});

			await todo.save();
		}

		res.json({ message: 'Tasks have been saved to the database' });
	} catch (error) {
		console.error('Error fetching and processing emails:', error);
		res.status(500).send('Failed to process emails');
	}
};

async function gemini_func(prompt) {
	const result = await model.generateContent(prompt);
	console.log(result, ': result\n', result.candidates?.[0], ': candidate\n');
	const responseText = result.response.text() || 'No response';
	console.log(`Response Text: ${responseText}\n`);
	return responseText;
}


export { fetchEmails };
