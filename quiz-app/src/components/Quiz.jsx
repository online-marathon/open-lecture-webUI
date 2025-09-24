import { useEffect, useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import { checkResults, getQuestions } from "../api/questions";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    (async () => {
      const sampleQuestions = await getQuestions();
      setQuestions(sampleQuestions);
    })();
  }, []);

  const q = questions[current];
  const selectedIndex = useMemo(() => {
    if (!q) return null;
    const entry = answers.find((a) => a.id === q.id);
    return entry ? entry.response : null;
  }, [answers, q]);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => {
      const i = prev.findIndex((a) => a.id === questionId);

      if (i === -1) {
        return [...prev, { id: questionId, response: optionIndex }];
      }
      const next = prev.slice();
      next[i] = { id: questionId, response: optionIndex };
      return next;
    });
  };

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = () => setCurrent((c) => Math.min(questions.length - 1, c + 1));

  const isFirst = current === 0;
  const isLast = questions.length ? current === questions.length - 1 : false;

  const handleFinish = () => {
    checkResults(questions, answers);
    // console.log("answers", answers);
  };

  if (!questions.length) {
    return <div className="app">Завантаження питань…</div>;
  }

  return (
    <div className="app">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h1>Quiz App</h1>
        <div aria-live="polite">
          {current + 1} / {questions.length}
        </div>
      </header>

      <QuestionCard
        questionId={q.id}
        question={q.question}
        options={q.options}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />

      <div>
        <button onClick={goPrev} disabled={isFirst}>
          Попереднє
        </button>
        {!isLast && <button onClick={goNext}>Наступне</button>}
        {isLast && (
          <button
            className="finish"
            onClick={handleFinish}
            title={
              answers.length < questions.length
                ? "Відповіді на всі питання ще не обрано"
                : ""
            }
          >
            Завершити
          </button>
        )}
      </div>
    </div>
  );
}
