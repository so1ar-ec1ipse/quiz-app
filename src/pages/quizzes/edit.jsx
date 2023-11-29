import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { findQuizById, updateQuizByIdWithFormValues } from "../../utils/quiz";
import { QuizContext } from "../../contexts/QuizContext";
import QuizForm from "../../components/QuizForm";

export default function QuizEdit() {
  const { id } = useParams();
  const { quizzes, setQuizzes } = useContext(QuizContext);
  const [curQuiz, setCurQuiz] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id && quizzes) setCurQuiz(findQuizById(quizzes, id));
  }, [id, quizzes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateQuizByIdWithFormValues(quizzes, setQuizzes, id, e.target);
    navigate(`/quizzes/${id}`);
  };

  return <QuizForm quiz={curQuiz} setQuiz={setCurQuiz} onSubmit={handleSubmit} />;
}
