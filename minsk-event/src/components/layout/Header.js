"use client";

import Link from "next/link";
export default function Header() {

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Events Minsk
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/events" className="text-white hover:text-gray-900">
            События
          </Link>
          <Link
            href="/events/create"
            className="text-white hover:text-gray-900"
          >
            Добавить событие
          </Link>

          <div className="flex items-center space-x-2 ml-4">
            <Link
              href="/login"
              className="px-4 py-2 text-white hover:text-gray-900"
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Регистрация
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
