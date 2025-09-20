"use client";
import { useEffect, useRef } from "react";
import { load } from "@2gis/mapgl";

export default function EventMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (!mapContainer.current) return;

      let map;
      load().then((mapglAPI) => {
        map = new mapglAPI.Map(mapContainer.current, {
          center: [27.5615, 53.9025],
          zoom: 12,
          key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
        });

        const testEvents = [
          { coordinates: [27.5615, 53.9025], title: "Концерт" },
          { coordinates: [27.565, 53.905], title: "Выставка" },
        ];

        testEvents.forEach((event) => {
          new mapglAPI.Marker(map, {
            coordinates: event.coordinates,
            title: event.title,
          });
        });
      });

      return () => {
        // Очистка ресурсов карты при размонтировании компонента
        if (map) {
          map.destroy();
        }
      };
    };

    loadMap();
  }, []);

  return (
    <div className="w-full h-96 rounded-lg shadow-lg">
      <div ref={mapContainer} className="w-full h-full"></div>
    </div>
  );
}
