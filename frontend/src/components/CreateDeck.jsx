"use client";

import { useState } from "react";

export default function CreateDeck() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/decks`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Deck Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="input-field"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="input-field"
      />

      <button
        type="submit"
        className="primary-button"
      >
        Create Deck
      </button>
    </form>
  );
}