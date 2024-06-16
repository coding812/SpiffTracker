import express from "express";
import cors from "cors";
import records from "./server/routes/sales.js";
import users from "./server/routes/users.js";
import path from "path";

const PORT = process.env.PORT || "";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static('./client/dist'));

// routes
app.use("/", records);
app.use("/record", records);
app.use("/users", users);


// serves the index.html with catchall route
app.get("*", (req, res) => {
  res.sendFile('client/dist/index.html', { root: '.' });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
