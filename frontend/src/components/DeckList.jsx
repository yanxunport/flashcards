"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
        const user = JSON.parse(
            localStorage.getItem("user")
            );
      const res = await fetch(
        "http://localhost:5000/api/decks",
        {
            headers: {
            Authorization: `Bearer ${user.token}`,
            },
        }
        );

      const data = await res.json();

      setDecks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDeck = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/decks/${id}`,
        {
          method: "DELETE",
        }
      );

      setDecks(
        decks.filter((deck) => deck._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 grid gap-4">
      {decks.map((deck) => (
        <div
          key={deck._id}
          className="border border-green-200 rounded-2xl p-5 flex justify-between items-start gap-4 hover:shadow-md transition bg-white"
        >
          <div>
            <Link href={`/decks/${deck._id}`}>
                <h2 className="text-xl font-bold hover:underline cursor-pointer">
                    {deck.title}
                </h2>
            </Link>

            <p className="text-gray-600">
              {deck.description}
            </p>
          </div>

          <button
            onClick={() => deleteDeck(deck._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}