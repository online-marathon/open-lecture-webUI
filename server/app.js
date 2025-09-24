const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const QUESTIONS = [
  {
    id: "q1",
    question:
      "Which HTTP method is typically used to retrieve data from a server?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correctIndex: 1,
  },
  {
    id: "q2",
    question: "Which HTTP method is typically used to send data to a server?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correctIndex: 0,
  },
  {
    id: "q3",
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctIndex: 2,
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/questions", (_req, res) => {
  const publicQuestions = QUESTIONS.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }));
  res.json(publicQuestions);
});

app.post("/check", (req, res) => {
  const { answers } = req.body || {};
  const details = answers.map(({ id, response }) => {
    const q = QUESTIONS.find((x) => x.id === id);
    if (!q) return { id, exists: false, isCorrect: false };

    const yourAnswer = q.options[response] ?? null;
    const correctAnswer = q.options[q.correctIndex];

    return {
      id,
      yourAnswer,
      correctAnswer,
      isCorrect: response === q.correctIndex,
    };
  });

  const score = details.filter((d) => d.isCorrect).length;

  res.json({
    total: QUESTIONS.length,
    answered: details.length,
    score,
    details,
  });
});

app.listen(PORT, () => {
  console.log(`Quiz API running on http://localhost:${PORT}`);
});
