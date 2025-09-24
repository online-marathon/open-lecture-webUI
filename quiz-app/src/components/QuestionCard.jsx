import { useMemo } from "react";

export default function QuestionCard({
  questionId,
  question,
  options,
  selectedIndex,
  onSelect,
}) {
  const qText = useMemo(() => decodeURIComponent(question), [question]);
  const opts = useMemo(() => options.map(decodeURIComponent), [options]);

  return (
    <div className="card" role="group">
      <span className="question">{qText}</span>

      <div className="options">
        {opts.map((opt, idx) => (
          <div
            key={`${questionId}-${idx}`}
            className="option"
            onClick={() => onSelect(questionId, idx)}
          >
            <input
              type="radio"
              name={questionId}
              value={idx}
              checked={selectedIndex === idx}
              readOnly
            />
            <span>{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
