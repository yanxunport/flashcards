"use client";

import { useEffect, useState } from "react";

export default function AIGenerator() {
  const [notes, setNotes] = useState("");

  const [result, setResult] = useState([]);

  const [decks, setDecks] = useState([]);

  const [selectedDeck, setSelectedDeck] =
    useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/decks`,
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

  const generateCards = async () => {
    try {
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            notes,
          }),
        }
      );

      const data = await res.json();

      const cleaned = data.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\\"/g, '"')
        .replace(/""/g, '"')
        .replace(/\\n/g, "")
        .trim();

      console.log(cleaned);

      const parsed = JSON.parse(cleaned);

      setResult(parsed);

    } catch (error) {
      console.log(error);

      setError(
        "Failed to generate valid flashcards."
      );
    }
  };

  const saveCardsToDeck = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${selectedDeck}/bulk-cards`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            cards: result,
          }),
        }
      );

      alert("Cards saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-green-600 drop-shadow-sm tracking-tight">
        AI Flashcard Generator
      </h2>

      <textarea
        placeholder="Paste study notes here..."
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="input-field w-full min-h-[200px]"
      />

      <select
        value={selectedDeck}
        onChange={(e) =>
          setSelectedDeck(e.target.value)
        }
        className="input-field mt-4 w-full"
      >
        <option value="">
          Select Deck
        </option>

        {Array.isArray(decks) &&
          decks.map((deck) => (
          <option
            key={deck._id}
            value={deck._id}
          >
            {deck.title}
          </option>
        ))}
      </select>

      <button
        onClick={generateCards}
        className="primary-button mt-4"
      >
        Generate Flashcards
      </button>

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      <div className="grid gap-4 mt-6">
        {result.map((card, index) => (
          <div
            key={index}
            className="card-container p-4"
          >
            <h3 className="font-bold text-lg">
              Q: {card.question}
            </h3>

            <p className="mt-2 text-gray-700">
              A: {card.answer}
            </p>
          </div>
        ))}
      </div>

      {result.length > 0 && (
        <button
          onClick={saveCardsToDeck}
          className="primary-button mt-6"
        >
          Save To Deck
        </button>
      )}
    </div>
  );
}