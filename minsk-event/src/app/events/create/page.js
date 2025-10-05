"use client";
import { useState } from "react";
import axios from "axios";
import { useNotification } from "../../../hooks/useNotification";
import { Notification } from "../../../components/ui/Notification";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    coordinates: ["", ""],
  });

  const { notification, showNotification, hideNotification } =
    useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.coordinates[0] || !formData.coordinates[1]) {
        showNotification("Введите координаты", "error");
        return;
      }

      const eventData = {
        ...formData,
        coordinates: [
          parseFloat(formData.coordinates[0]),
          parseFloat(formData.coordinates[1]),
        ],
      };

      const response = await axios.post("/api/events", eventData);

      if (response.data.success) {
        showNotification("Событие успешно добавлено!", "success");
        setFormData({
          title: "",
          description: "",
          date: "",
          coordinates: ["", ""],
        });
      }
    } catch (error) {
      showNotification("Ошибка при добавлении события", "error");
      console.error("Error details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoordinateChange = (index, value) => {
    const newCoordinates = [...formData.coordinates];
    newCoordinates[index] = value;
    setFormData({
      ...formData,
      coordinates: newCoordinates,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Создать новое событие
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md"
        >
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Название события"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание события"
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Дата события (например: 15 ноября 2025)"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Координаты:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                step="any"
                value={formData.coordinates[0]}
                onChange={(e) => handleCoordinateChange(0, e.target.value)}
                placeholder="Долгота (27.5615)"
                required
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                step="any"
                value={formData.coordinates[1]}
                onChange={(e) => handleCoordinateChange(1, e.target.value)}
                placeholder="Широта (53.9025)"
                required
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              Пример для Минска: 27.5615, 53.9025
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Добавить событие
          </button>
        </form>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
        />
      </div>
    </div>
  );
}
