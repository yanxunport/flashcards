"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-green-200 bg-white sticky top-0 z-50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-black text-green-600 tracking-tight"
        >
          FlashLearn
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <p className="text-gray-600">
                {user?.user?.username}
              </p>

              <button
                onClick={logout}
                className="delete-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="secondary-button"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="primary-button"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}