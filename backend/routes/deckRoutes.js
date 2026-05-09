import express from "express";
import Deck from "../models/Deck.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const deck = await Deck.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user,
        });

    res.status(201).json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const decks = await Deck.find({
        user: req.user,
        });

    res.json(decks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    res.json(deck);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/cards", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    deck.cards.push({
      question: req.body.question,
      answer: req.body.answer,
    });

    await deck.save();

    res.status(201).json(deck);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:deckId/cards/:cardId", async (req, res) => {
  try {
    const deck = await Deck.findById(
      req.params.deckId
    );

    deck.cards = deck.cards.filter(
      (card) =>
        card._id.toString() !==
        req.params.cardId
    );

    await deck.save();

    res.json(deck);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/bulk-cards", async (req, res) => {
  try {
    const deck = await Deck.findById(
      req.params.id
    );

    const { cards } = req.body;

    deck.cards.push(...cards);

    await deck.save();

    res.json(deck);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deck deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;