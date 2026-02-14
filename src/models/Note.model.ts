import mongoose, { InferSchemaType } from 'mongoose'

const formattedDate = (value?: Date): string => {
  const date = value ?? new Date()
  return date
    .toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace(',', '')
}

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    details: {
      type: String,
      required: [true, 'Details are required'],
      trim: true
    },
    date: {
      type: Date,
      default: () => new Date()
    },
    dateLabel: {
      type: String,
      default: function (this: { date?: Date }) {
        return formattedDate(this.date)
      }
    }
  },
  {
    timestamps: true
  }
);

type Note = InferSchemaType<typeof notesSchema>;

type NoteDocument = mongoose.Document & Note;

const NoteModel = mongoose.model<NoteDocument>('Note', notesSchema);
export default NoteModel;