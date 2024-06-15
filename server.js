import express from "express";
import cors from "cors";
import records from "./server/routes/sales.js";
import users from "./server/routes/users.js";

const PORT = process.env.PORT || "";
const app = express();

app.use(express.static('./client/dist'));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist",     
  "index.html"));
});

app.use(cors());
app.use(express.json());
app.use("/", records);
app.use("/record", records);
app.use("/users", users);

app.use(express.urlencoded({ extended: false }));



// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
