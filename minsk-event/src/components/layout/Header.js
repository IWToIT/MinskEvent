"use client";

import { useSession, signIn, signOut } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Events Minsk
        </h1>
        <nav>
          {session ? (
          <div className="flex items-center gap-4">
            <span>Привет, {session.user.name}</span>
            <button onClick={() => signOut()} className="bg-white text-blue-600 px-3 py-1 rounded">Выйти</button>
          </div>
        ):(
          <button onClick={() => signIn()} className="bg-white text-blue-600 px-3 py-1 rounded">Войти</button>
        )}
        </nav>
      </div>
    </header>
  )
}

