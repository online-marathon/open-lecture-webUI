export const sampleQuestions = [
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
];

export async function getQuestions() {
  const { token } = await (
    await fetch("https://opentdb.com/api_token.php?command=request")
  ).json();

  const resp = await fetch(
    `https://opentdb.com/api.php?amount=10&encode=url3986&token=${token}`
  );
  console.log(resp);

  const { results } = await resp.json();
  console.log(results);

  const qustions = results.map((q) => ({
    question: q.question,
    id: q.id || Math.random(),
    options: [...q.incorrect_answers, q.correct_answer],
  }));
  return qustions;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleQuestions);
    }, 2000);
  });
}

export async function checkResults(questions, answers) {
  console.log(questions);
  console.log(answers);
  
  
  const prepared = answers.map(({ id, response }) => {
    const q = questions.find((q) => q.id === id);
    if (!q) return { id, answer: null };
    return {
      id,
      answer: q.options[response] ?? null,
    };
  });
  console.log("Prepared answers:", prepared);
}
