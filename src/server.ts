import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
});