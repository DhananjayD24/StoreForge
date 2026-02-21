/**
 * NotificationDropdown.jsx
 *
 * Displays notification inbox panel.
 *
 * Reads notifications from NotificationContext.
 * Later triggered via Socket.io events.
 */

import { useNotifications } from "../../context/NotificationContext";

export default function NotificationDropdown({ open, onClose }) {
  const { notifications, markAllRead } = useNotifications();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div className="
        absolute right-0 mt-3 w-80
        bg-white dark:bg-gray-800
        rounded-xl shadow-xl border
        dark:border-gray-700 z-50
      ">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold">Notifications</h3>

          <button
            onClick={markAllRead}
            className="text-xs text-blue-600 hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`
                  p-4 border-b dark:border-gray-700 text-sm
                  ${!n.read ? "bg-blue-50 dark:bg-gray-700/40" : ""}
                `}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}