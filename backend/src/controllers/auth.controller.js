import { google } from 'googleapis';
import User from '../models/user.model.js';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URI
);

export const login = (req, res) => {
	const scopes = [
		'https://www.googleapis.com/auth/gmail.readonly',
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
	];

	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		prompt: 'consent',
	});

	res.redirect(url);
};
export const callback = async (req, res) => {
	try {
		const { code } = req.query;
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		const oauth2 = google.oauth2({
			auth: oauth2Client,
			version: 'v2',
		});
		const userInfo = await oauth2.userinfo.get();

		// Ensure user is defined before using it
		let user = await User.findOneAndUpdate(
			{ email: userInfo.data.email },
			{
				email: userInfo.data.email,
				name: userInfo.data.name,
				picture: userInfo.data.picture,
				tokens,
				token: '', // Temporarily set token to an empty string
			},
			{ upsert: true, new: true }
		);

		// Now assign the user._id to token
		const userToken = user._id.toString();
		user.token = userToken;
		await user.save(); // Save the user with the updated token

		res.cookie('userToken', userToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		});
		res.redirect('http://localhost:5173/home');
	} catch (error) {
		console.error('Error during OAuth callback:', error);
		res.status(500).send('Authentication failed');
	}
};

export const logout = (req, res) => {
	res.clearCookie('userToken');
	res.redirect('/');
};
