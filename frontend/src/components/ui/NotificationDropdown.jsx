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
        bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden
      ">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Notifications</h3>

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
                key={n.id || n._id || Math.random()}
                className={`
                  p-4 border-b border-slate-100 text-sm transition hover:bg-slate-50
                  ${!n.read ? "bg-blue-50/50 font-medium text-slate-900" : "text-slate-600"}
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