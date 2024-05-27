import express from "express";
import cors from "cors";
import records from "./routes/sales.js";
import users from "./routes/users.js";

const PORT = process.env.PORT || "";
const app = express();

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
