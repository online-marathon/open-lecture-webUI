const API_URL = "http://localhost:3000";

export async function getQuestions() {
  const resp = await fetch(`${API_URL}/questions`);

  if (!resp.ok) {
    throw new Error("Failed to load questions");
  }
  return await resp.json();
}

export async function checkResults(questions, answers) {
  console.log(questions);
  console.log(answers);

  const prepared = answers.map(({ id, response }) => {
    const q = questions.find((q) => q.id === id);
    if (!q) return { id, answer: null, response };
    return {
      id,
      answer: q.options[response] ?? null,
      response, 
    };
  });

  console.log("Prepared answers:", prepared);

  const resp = await fetch(`${API_URL}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: prepared }),
  });

  const result = await resp.json();
  console.log(result);
}
