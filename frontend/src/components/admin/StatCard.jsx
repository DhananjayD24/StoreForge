// StatCard.jsx
// Premium styled metric card

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
      
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h3 className="text-2xl md:text-3xl font-bold mt-2">
        {value}
      </h3>

      {subtitle && (
        <p className="text-xs text-green-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatCard;
