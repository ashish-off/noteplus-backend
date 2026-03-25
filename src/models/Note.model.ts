import mongoose, { InferSchemaType } from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    details: {
      type: String,
      required: [true, "Details are required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

type Note = InferSchemaType<typeof notesSchema>;

type NoteDocument = mongoose.Document & Note;

const NoteModel = mongoose.model<NoteDocument>("Note", notesSchema);
export default NoteModel;
