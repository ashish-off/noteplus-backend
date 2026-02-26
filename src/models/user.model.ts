import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // doesn't return password in queries by default
    },
  },
  { timestamps: true },
);

export type UserType = mongoose.InferSchemaType<typeof userSchema>;
export type UserDocument = mongoose.Document & UserType;

export const User = mongoose.model<UserDocument>("User", userSchema);
