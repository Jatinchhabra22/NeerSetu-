import React, { useState } from 'react';

const Settings = () => {
  const [form, setForm] = useState({
    language: 'English',
    emergencyThreshold: 350,
    notifications: true,
  });
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    localStorage.setItem('neersetu_settings', JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Operational preferences and alert thresholds</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <label className="block">
          <span className="text-sm text-gray-500">Language</span>
          <select
            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900"
            value={form.language}
            onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Assamese</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-500">Emergency Alert Threshold</span>
          <input
            type="number"
            min="100"
            max="500"
            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900"
            value={form.emergencyThreshold}
            onChange={(e) => setForm((p) => ({ ...p, emergencyThreshold: Number(e.target.value) }))}
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.notifications}
            onChange={(e) => setForm((p) => ({ ...p, notifications: e.target.checked }))}
          />
          <span className="text-slate-200">Enable notification feeds</span>
        </label>

        <button onClick={onSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Save Settings
        </button>
        {saved && <p className="text-green-400 text-sm">Settings saved.</p>}
      </div>
    </div>
  );
};

export default Settings;
