import express from "express";
import Manga from "../model/mangaModel.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.get("/manga", verifyJWT, async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (error) {
    throw error.message;
  }
});

router.get("/manga/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const manga = await Manga.findById(id);
    res.json(manga);
  } catch (error) {
    throw error.message;
  }
});

router.post("/manga", async (req, res) => {
  try {
    const { name, topic } = req.body;
    const manga = await Manga.create({ name, topic });
    res.json(manga);
  } catch (error) {
    throw error.message;
  }
});

router.put("/manga/:id", async (req, res) => {
  try {
    const { name, topic } = req.body;
    const { id } = req.params;
    const manga = await Manga.findByIdAndUpdate(
      id,
      { name, topic },
      { new: true }
    );
    res.json(manga);
  } catch (error) {
    throw error.message;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Manga.findByIdAndDelete(id);
    res.json({ message: "Manga deleted successfully !" });
  } catch (error) {
    throw error.message;
  }
});

export default router;
