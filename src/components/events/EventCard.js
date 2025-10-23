export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{event.date}</span>
        <span>Координаты: [{event.coordinates.join(', ')}]</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Минск, Дворец спорта</span>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        Купить билет
      </button>
    </div>
  );
}
