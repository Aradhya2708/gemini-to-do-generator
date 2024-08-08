import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const authenticateUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) {
        return res.status(401).send('Unauthorized 1');
    }

    // Query for the user by the token field
    const user = await User.findOne({ token });
    if (!user) {
        return res.status(401).send('Unauthorized 2');
    }

    req.user = user;
    next();
});

export { authenticateUser };
