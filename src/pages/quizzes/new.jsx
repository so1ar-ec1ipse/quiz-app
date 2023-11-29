import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createQuizWithFormValues } from "../../utils/quiz";
import { QuizContext } from "../../contexts/QuizContext";
import QuizForm from "../../components/QuizForm";

export default function QuizNew() {
  const { quizzes, setQuizzes } = useContext(QuizContext);
  const [curQuiz, setCurQuiz] = useState({
    id: null,
    title: "",
    description: "",
    score: null,
    url: "",
    created: null,
    modified: null,
    questions_answers: [],
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    createQuizWithFormValues(quizzes, setQuizzes, e.target);
    navigate(`/quizzes`);
  };

  return <QuizForm quiz={curQuiz} setQuiz={setCurQuiz} onSubmit={handleSubmit} />;
}
