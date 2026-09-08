import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todos = [];
let nextId = 1;

app.get("/", (_req, res) => {
  res.send("Hello from idea-to-mvp");
});

app.get("/todos", (_req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }

  const todo = { id: nextId++, title: title.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.post("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.done = true;
  res.status(200).json(todo);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
