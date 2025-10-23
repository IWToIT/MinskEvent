"use client";
import { useState, useEffect } from "react";
import EventMap from "../components/events/EventMap";
import EventsList from "../components/events/EventList";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [mobileView, setMobileView] = useState("map");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.events || data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0">
      <div className="lg:hidden flex border-b bg-white shrink-0">
        <button
          onClick={() => setMobileView("map")}
          className={`flex-1 py-3 text-center font-medium ${
            mobileView === "map"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          🗺️ Карта
        </button>
        <button
          onClick={() => setMobileView("list")}
          className={`flex-1 py-3 text-center font-medium ${
            mobileView === "list"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          📋 Список
        </button>
      </div>
      <div
        className={`
        ${mobileView === "list" ? "flex" : "hidden"} 
        lg:flex flex-col w-full lg:w-1/4 bg-white border-b lg:border-b-0 lg:border-r min-h-0
      `}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="border-b border-gray-100 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Все события</h2>
            <p className="text-gray-500 text-sm mt-1">
              {events.length}{" "}
              {events.length === 1
                ? "событие"
                : events.length < 5
                ? "события"
                : "событий"}
            </p>
          </div>
          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : (
            <EventsList events={events} />
          )}
        </div>
      </div>
      <div
        className={`
        ${mobileView === "map" ? "flex" : "hidden"} 
        lg:flex flex-1 w-full lg:w-3/4 min-h-0
      `}
      >
        <EventMap />
      </div>
    </div>
  );
}
