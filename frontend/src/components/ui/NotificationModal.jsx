import { useEffect } from "react";

function NotificationModal({ notification, onClose }) {

  useEffect(() => {

    const handleOutside = (e) => {
      if (e.target.id === "modal-overlay") {
        onClose();
      }
    };

    window.addEventListener("click", handleOutside);

    return () => window.removeEventListener("click", handleOutside);

  }, [onClose]);

  if (!notification) return null;

  return (

    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >

      <div className="bg-white dark:bg-gray-800 w-[420px] rounded-xl shadow-xl p-6 relative">

        {/* Close button */}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Order Notification
        </h2>

        <div className="space-y-2 text-sm">

          <p>
            <strong>Customer:</strong> {notification.customerName}
          </p>

          <p>
            <strong>Phone:</strong> {notification.customerPhone}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{notification.totalAmount}
          </p>

          <p className="text-gray-500 mt-3">
            {notification.message}
          </p>

        </div>

      </div>

    </div>

  );

}

export default NotificationModal;