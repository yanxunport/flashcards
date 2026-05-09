"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudyPage({ params }) {
  const deckId = React.use(params).id;

  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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
      console.log(data);
      const data = await res.json();
      console.log(error);

    }
  };

  if (!deck) {
    return <p className="p-10">Loading...</p>;
  }

  if (deck.cards.length === 0) {
    return (
  <ProtectedRoute>
      <main className="max-w-7xl mx-auto p-8 min-h-screen bg-black/30 backdrop-blur-sm rounded-3xl">
        <Link
          href={`/decks/${deckId}`}
          className="secondary-button inline-block mb-6"
        >
          ← Back to Deck
        </Link>

        <h1 className="text-3xl font-bold mb-4">
          {deck.title}
        </h1>

        <p>No flashcards yet.</p>
      </main>
        </ProtectedRoute>
    );
  }

  const card = deck.cards[currentCard];

  const nextCard = () => {
    setShowAnswer(false);

    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const previousCard = () => {
    setShowAnswer(false);

    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-8 min-h-screen bg-black/30 backdrop-blur-sm rounded-3xl">
      <Link
        href={`/decks/${deckId}`}
        className="secondary-button inline-block mb-6"
      >
        ← Back to Deck
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Study Mode
        </h1>

        <p className="text-gray-600">
          {currentCard + 1} / {deck.cards.length}
        </p>
      </div>

      <motion.div
        key={showAnswer ? "answer" : "question"}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() =>
          setShowAnswer(!showAnswer)
        }
        className="border rounded-2xl p-10 min-h-[300px] flex items-center justify-center text-center cursor-pointer shadow-lg bg-white border-green-200"
      >
        {!showAnswer ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Question
            </p>

            <h2 className="text-2xl font-bold">
              {card.question}
            </h2>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Answer
            </p>

            <h2 className="text-2xl font-bold">
              {card.answer}
            </h2>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between mt-8">
        <button
          onClick={previousCard}
          className="bg-gray-200 px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setShowAnswer(!showAnswer)
          }
          className="primary-button"
        >
          Flip
        </button>

        <button
          onClick={nextCard}
          className="bg-gray-200 px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Next
        </button>
      </div>
    </main>
  );
}