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
            "Content-Type":
              "application/json",
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
    return (
      <p className="text-white p-10">
        Loading...
      </p>
    );
  }

  return (
    <ProtectedRoute>
      <main className="max-w-7xl mx-auto p-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8">

            {/* Deck Info */}
            <section className="card-container p-6">
              <Link
                href="/"
                className="text-green-600 hover:underline inline-block mb-4"
              >
                ← Back
              </Link>

              <h1 className="text-4xl font-black text-green-700 mb-2">
                {deck.title}
              </h1>

              <p className="text-gray-600">
                {deck.description}
              </p>

              <Link
                href={`/decks/${deckId}/study`}
                className="primary-button inline-block mt-6"
              >
                Start Studying
              </Link>
            </section>

            {/* Add Card */}
            <section className="card-container p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Add Flashcard
              </h2>

              <form
                onSubmit={addCard}
                className="flex flex-col gap-4"
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
                  className="input-field min-h-[140px]"
                />

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Card
                </button>
              </form>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <section className="card-container p-6">
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                Flashcards
              </h2>

              {deck.cards.length === 0 ? (
                <p className="text-gray-500">
                  No flashcards yet.
                </p>
              ) : (
                <div className="grid gap-4">
                  {deck.cards.map((card, index) => (
                    <div
                      key={index}
                      className="border border-green-100 rounded-2xl p-5 flex justify-between gap-4 bg-white/70"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-green-900">
                          Q: {card.question}
                        </h3>

                        <p className="mt-3 text-gray-700">
                          A: {card.answer}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          deleteCard(card._id)
                        }
                        className="delete-button h-fit"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}