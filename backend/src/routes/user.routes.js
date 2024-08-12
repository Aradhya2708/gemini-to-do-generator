// user.routes.js (or wherever your routes are defined)
import express from 'express';
import User from '../models/user.model.js';   

const router = express.Router();

// Route to update user settings
router.put('/settings', async (req, res) => {
  const { emailScanCount } = req.body; // assuming userId is sent along with settings

  try {
    // Find the user and update the settings
    const user = req.user;
    if (!user) return res.status(404).send('User not found');

    user.config.emailsToScan = emailScanCount;

    await user.save();
    res.status(200).send('Settings updated successfully');
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).send('Server error');
  }
});

export default router;
