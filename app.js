const path = require("path");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

const app = express();
const PORT = process.env.PORT ?? 3000;

const VIEWS_DIR = path.join(__dirname, "views");
const DATA_PATH = path.join(__dirname, "data.json");

// hbs
app.set("view engine", "hbs");
app.set("views", VIEWS_DIR);
hbs.registerPartials(path.join(VIEWS_DIR, "partials"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// helpers JSON (sync)
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeData = (data) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

const makeCardId = () =>
  `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));

app.get("/dashboard", (req, res) => {
  res.render("dashboard", readData());
});

app.post("/nueva-tarjeta", (req, res) => {
  const title = (req.body.title ?? "").trim();
  if (!title) return res.redirect("/dashboard");

  const { boardId, listId } = req.body;
  const data = readData();

  const list = data.boards
    .find((b) => b.id === boardId)
    ?.lists.find((l) => l.id === listId);

  if (!list) return res.redirect("/dashboard");

  list.cards.push({ id: makeCardId(), title });
  writeData(data);

  res.redirect("/dashboard");
});

app.use((req, res) => res.status(404).send("404 - Not Found"));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));