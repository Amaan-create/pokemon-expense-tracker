import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import app from "./app.js";
import db from "./config/db.js";

dotenv.config();

const schema = fs.readFileSync(path.resolve("src/database/schema.sql"), "utf8");

db.exec(schema);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
