import React, { useState } from "react";
import { Palette, User, Bell, Lock, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const Settings = () => {
  const { themeMode, setThemeMode } = useTheme();
  const [activeModal, setActiveModal] = useState(null); // track which modal is open

  return (
    <div className="space-y-6 fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your preferences</p>
      </div>

      {/* Grid of Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Theme Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Theme Preferences</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "light", label: "Light", icon: "☀️" },
              { value: "dark", label: "Dark", icon: "🌙" },
              { value: "system", label: "System", icon: "💻" },
              { value: "time-based", label: "Auto", icon: "🕐" },
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => setThemeMode(theme.value)}
                className={
                  "p-3 rounded-lg border text-center transition-all duration-200 hover:scale-105 " +
                  (themeMode === theme.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300")
                }
              >
                <div className="text-2xl mb-1">{theme.icon}</div>
                <div className="text-sm font-medium">{theme.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Profile</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Update your personal information and account details.
          </p>
          <button
            onClick={() => setActiveModal("profile")}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage email and in-app notification preferences.
          </p>
          <button
            onClick={() => setActiveModal("notifications")}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Manage Notifications
          </button>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Security</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Change your password and enable two-factor authentication.
          </p>
          <button
            onClick={() => setActiveModal("security")}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Security Settings
          </button>
        </div>
      </div>

      {/* --------- MODALS --------- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl w-full max-w-lg relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            {activeModal === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full mb-3 px-3 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 px-3 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            )}

            {activeModal === "notifications" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" /> Email Notifications
                </label>
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" /> Push Notifications
                </label>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Preferences
                </button>
              </div>
            )}

            {activeModal === "security" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full mb-3 px-3 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full mb-3 px-3 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
