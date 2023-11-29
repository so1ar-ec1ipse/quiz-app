import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import { findQuizById } from "../../utils/quiz";
import { QuizContext } from "../../contexts/QuizContext";
import Button from "../../components/tailwind/Button";

export default function QuizView() {
  const { id } = useParams();
  const { quizzes } = useContext(QuizContext);
  const curQuiz = useMemo(() => findQuizById(quizzes, id), [id, quizzes]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button href="/" label="Go To Home" className="mr-2" />
        <Button href={`/quizzes/${id}/edit`} label="Edit" />
      </div>

      <div className="mb-4">
        <div>
          <b>Title:</b> {curQuiz?.title}
        </div>
        <div>
          <b>Description:</b> {curQuiz?.description}
        </div>
        <div>
          <b>Score:</b> {curQuiz?.score ?? "N/A"}
        </div>
        <div>
          <b>Media url:</b> {curQuiz?.url ?? "N/A"}
        </div>
        <div>
          <b>Created:</b> {curQuiz?.created}
        </div>
        <div>
          <b>Modified:</b> {curQuiz?.modified}
        </div>
      </div>

      {curQuiz?.questions_answers?.map((qaSet, quesIndex) => (
        <div key={quesIndex}>
          <div className="mb-2">
            <b>Q{quesIndex + 1}:</b> {qaSet.text}
          </div>
          {qaSet?.answers?.map((answer, ansIndex) => (
            <div key={ansIndex} className="ml-8">
              <input
                type="radio"
                id={`answer-${quesIndex}:${ansIndex}`}
                checked={answer.is_true}
                readOnly
              />
              <label htmlFor={`answer-${quesIndex}:${ansIndex}`} className="ml-1">
                {answer.text}
              </label>
            </div>
          ))}
          <div className="my-2">
            <div className="ml-8">
              Feedback false: <i>{qaSet.feedback_false}</i>
            </div>
            <div className="ml-8">
              Feedback true: <i>{qaSet.feedback_true}</i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
