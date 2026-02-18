import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
  deleteAllNotes
} from "../controllers/note.controller";
const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);

router.route("/delete-all").delete(deleteAllNotes);

router.route("/:id").get(getNoteById).delete(deleteNote).put(updateNote);

export default router;
