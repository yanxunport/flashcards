import mongoose from "mongoose";

const deckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    cards: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  
  {
    timestamps: true,
  }
);

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;