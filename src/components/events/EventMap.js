"use client";
import { useEffect, useRef, useState } from "react";
import { load } from "@2gis/mapgl";
import { Clusterer } from "@2gis/mapgl-clusterer";
import EventCard from "./EventCard";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../ui/Notification";
import { clusterIcon } from "../../assets/EventIcons";

export default function EventMap() {
  const mapContainer = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const mapRef = useRef(null);
  const mapglAPIRef = useRef(null);
  const clustererRef = useRef(null);

  const { notification, showNotification, hideNotification } =
    useNotification();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        console.log("API response:", data);
        setEvents(data.events);
      } catch (error) {
        console.error("Ошибка загрузки событий:", error);
        showNotification("Ошибка загрузки событий", "error");
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    let mapInstance;

    const loadMap = async () => {
      if (!mapContainer.current || mapRef.current) return;

      try {
        const mapglAPI = await load();
        mapglAPIRef.current = mapglAPI;
        mapInstance = new mapglAPI.Map(mapContainer.current, {
          center: [27.5615, 53.9025],
          zoom: 12,
          key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
        });

        mapRef.current = mapInstance;

        mapInstance.on("click", () => {
          setSelectedEvent(null);
        });
      } catch (error) {
        console.error("Ошибка загрузки карты:", error);
      }
    };

    loadMap();

    return () => {
      if (clustererRef.current) {
        clustererRef.current.destroy();
      }
      if (mapInstance) {
        mapInstance.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapglAPIRef.current || events.length === 0) return;

    if (clustererRef.current) {
      clustererRef.current.destroy();
    }

    const points = events.map((event) => ({
      coordinates: event.coordinates,
      properties: {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
      },
    }));

    clustererRef.current = new Clusterer(mapRef.current, {
      radius: 60,
    });

    clustererRef.current.load(points);

    clustererRef.current.on("click", (event) => {
      const { object } = event;

      if (object.cluster) {
        mapRef.current.setCenter(object.coordinates);
        mapRef.current.setZoom(mapRef.current.getZoom() + 2);
      } else {
        const eventData = events.find((e) => e.id === object.properties.id);
        if (eventData) {
          setSelectedEvent(eventData);
        }
      }
    });

    clustererRef.current.on("style", (event) => {
      const { object, style } = event;

      if (object.cluster) {
        const pointsCount = object.pointsCount;

        style.icon = {
          content: `
            <div style="
              background: #3B82F6;
              color: white;
              border: 3px solid white;
              border-radius: 50%;
              width: ${40 + Math.min(pointsCount, 10) * 4}px;
              height: ${40 + Math.min(pointsCount, 10) * 4}px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
              ${pointsCount}
            </div>
          `,
        };
      } else {
        style.icon = {
          content: `
            <div style="
              background: #EF4444;
              color: white;
              border: 3px solid white;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              cursor: pointer;
            ">
              📍
            </div>
          `,
        };
      }
    });
  }, [mapRef.current, mapglAPIRef.current, events]);

  const refreshEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data.events);
      showNotification("События обновлены", "success");
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
      showNotification("Ошибка обновления событий", "error");
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg shadow-lg">
      <button
        onClick={refreshEvents}
        className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        title="Обновить карту"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      <div ref={mapContainer} className="w-full h-full"></div>

      {selectedEvent && (
        <div className="absolute top-4 right-4 z-10">
          <EventCard event={selectedEvent} />
        </div>
      )}

      {selectedEvent && (
        <button
          onClick={() => setSelectedEvent(null)}
          className="absolute top-16 left-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}
