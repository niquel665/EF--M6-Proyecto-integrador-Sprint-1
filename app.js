const path = require("path");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

const app = express();
const PORT = process.env.PORT ?? 3000;
const DATA_PATH = path.join(__dirname, "data.json");

// --- Config hbs ---
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// --- Middlewares ---
app.use(express.urlencoded({ extended: true })); // para leer form POST
app.use(express.static(path.join(__dirname, "public")));

// --- Helpers de archivo (sync para cumplir el enunciado) ---
function readData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeData(data) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(DATA_PATH, json, "utf-8");
}

function makeId(prefix = "c") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// --- HU-01: navegación ---
app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));

// --- HU-02: dashboard lee data.json y renderiza ---
app.get("/dashboard", (req, res) => {
  const data = readData();
  res.render("dashboard", data);
});

// --- HU-03: crear tarjeta (Leer -> Modificar -> Escribir) ---
app.post("/nueva-tarjeta", (req, res) => {
  const { boardId, listId, title } = req.body;

  if (!title || !title.trim()) return res.redirect("/dashboard");

  const data = readData();

  const board = data.boards.find((b) => b.id === boardId);
  if (!board) return res.redirect("/dashboard");

  const list = board.lists.find((l) => l.id === listId);
  if (!list) return res.redirect("/dashboard");

  list.cards.push({
    id: makeId("c"),
    title: title.trim(),
  });

  writeData(data);
  return res.redirect("/dashboard");
});

app.use((req, res) => res.status(404).send("404 - Not Found"));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));