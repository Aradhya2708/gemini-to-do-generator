import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  // State for inputs
  const [emailScanCount, setEmailScanCount] = useState(10); 
  const [notificationDays, setNotificationDays] = useState(1);
  const handleSaveSettings = async () => {
    try {
      await axios.put('http://localhost:5000/user/settings', {
        emailScanCount,
     // replace with actual user ID, possibly from context or state
      }, {withCredentials: true});
      alert(`Settings saved: Scan ${emailScanCount} past emails, Notify ${notificationDays} days before.`);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        {/* Input for number of past emails to scan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="emailScanCount">
            Number of Past Emails to Scan:
          </label>
          <input
            id="emailScanCount"
            type="number"
            value={emailScanCount}
            onChange={(e) => setEmailScanCount(Number(e.target.value))}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Dropdown for notification days */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="notificationDays">
            Days Before Event for Notification:
          </label>
          <select
            id="notificationDays"
            value={notificationDays}
            onChange={(e) => setNotificationDays(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {[1, 2, 3, 7].map((days) => (
              <option key={days} value={days}>
                {days} Day{days > 1 && 's'} Before
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
