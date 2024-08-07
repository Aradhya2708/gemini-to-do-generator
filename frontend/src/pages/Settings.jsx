import React, { useState } from 'react';

const Settings = () => {
  // State for dropdowns
  const [emailScanDays, setEmailScanDays] = useState(7); // Default 7 days
  const [notificationDays, setNotificationDays] = useState(1); // Default 1 day before

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        {/* Dropdown for email scan days */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="emailScanDays">
            Number of Days to Scan Emails:
          </label>
          <select
            id="emailScanDays"
            value={emailScanDays}
            onChange={(e) => setEmailScanDays(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {[7, 14, 30, 60].map((days) => (
              <option key={days} value={days}>
                {days} Days
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for notification days */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="notificationDays">
            Days Before Event for Notification:
          </label>
          <select
            id="notificationDays"
            value={notificationDays}
            onChange={(e) => setNotificationDays(e.target.value)}
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
          onClick={() => {
            alert(`Settings saved: Scan ${emailScanDays} days, Notify ${notificationDays} days before.`);
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
