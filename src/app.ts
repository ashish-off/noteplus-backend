import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/notes.routes";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/api/notes", authMiddleware, router);

// auth routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hi this is Ashish Saud, And this is API for my noteplus app.",
    api_endpoints: {
      get_all_notes: "/api/notes",
      create_note: "/api/notes",
      get_note_by_id: "/api/notes/:id",
      update_note: "/api/notes/:id",
      delete_note: "/api/notes/:id",
      delete_all_notes: "/api/notes/delete-all",
    },
  });
});

export default app;
