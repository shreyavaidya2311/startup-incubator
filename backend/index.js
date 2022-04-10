const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

(async function () {
  await connectDB();
})();

const port = 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

const routes = ["users", "startups"];
routes.forEach((route) =>
  app.use(`/api/${route}`, require(`./routes/${route}`))
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
