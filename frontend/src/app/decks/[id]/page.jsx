"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function DeckPage({ params }) {
  const [deck, setDeck] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const deckId = React.use(params).id;

  useEffect(() => {
    fetchDeck();
  }, []);

  const fetchDeck = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${deckId}`
      );

      const data = await res.json();

      setDeck(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCard = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${deckId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            answer,
          }),
        }
      );

      const data = await res.json();

      setDeck(data);

      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async (cardId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${deckId}/cards/${cardId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    setDeck(data);
  } catch (error) {
    console.log(error);
  }
};

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
  <ProtectedRoute>
    <main className="max-w-7xl mx-auto p-8 min-h-screen bg-black/30 backdrop-blur-sm rounded-3xl">
      <h1 className="text-4xl font-bold text-green-700 mb-2">
        {deck.title}
      </h1>

      <p className="text-gray-600 mb-8">
        {deck.description}
      </p>

      <form
        onSubmit={addCard}
        className="flex flex-col gap-4 border p-4 rounded-xl mb-8"
      >
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="input-field"
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          className="input-field"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition text-white p-2 rounded"
        >
          Add Card
        </button>
      </form>

      {deck.cards.length === 0 && (
        <p className="text-gray-500">
            No flashcards yet.
        </p>
        )}

      <div className="grid gap-4">
    {deck.cards?.map((card, index) => (
        <div
        key={index}
        className="card-container p-4 flex justify-between gap-4"
        >
        <div>
            <h2 className="font-bold">
            Q: {card.question}
            </h2>

            <p className="mt-2">
            A: {card.answer}
            </p>
        </div>

        <button
            onClick={() =>
            deleteCard(card._id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded-xl h-fit"
        >
            Delete
        </button>
        </div>
    ))}
    </div>
      <Link
        href={`/decks/${deckId}/study`}
        className="primary-button inline-block mt-6"
        >
        Start Studying
    </Link>
    </main>
      </ProtectedRoute>
    
  );
}