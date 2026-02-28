import NoteModel from "../models/Note.model";
import formattedDate from "../utils/formattedDate";
import { Response } from "express";

// get all notes
export const getAllNotes = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const notes = await NoteModel.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get a single note by id
export const getNoteById = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { id } = req.params;
    const note = await NoteModel.findOne({ _id: id, userId });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// create a new note
export const createNote = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { title, details } = req.body;
    const newNote = await NoteModel.create({
      title,
      details,
      userId,
    });
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// delete a note by id
export const deleteNote = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { id } = req.params;
    const deletedNote = await NoteModel.findOneAndDelete({ _id: id, userId });
    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// update a note by id
export const updateNote = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { id } = req.params;
    const { title, details } = req.body;
    const updatedNote = await NoteModel.findOneAndUpdate(
      { _id: id, userId },
      { title, details, dateLabel: formattedDate() },
      { new: true },
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// delete all notes
export const deleteAllNotes = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    await NoteModel.deleteMany({ userId });
    res.status(200).json({
      success: true,
      message: "All notes deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete all notes",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
