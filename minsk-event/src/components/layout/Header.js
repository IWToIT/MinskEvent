"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/"className="text-xl font-bold">Events Minsk</Link>
        <nav>
          {!session ? (
            <>
              <Link
                href="/events/create"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
              >
                📍 Добавить событие
              </Link>

              <div className="flex items-center gap-4">
                {/* <span>Привет, {session.user.name}</span> */}
                <button
                  onClick={() => signOut()}
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() =>
                signIn("credentials", {
                  email: "test@test.com",
                  password: "test",
                })
              }
              className="bg-white text-blue-600 px-3 py-1 rounded"
            >
              Войти
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
