import React, { useState, useEffect, useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";
import Card from "../../components/tailwind/Card";
import Button from "../../components/tailwind/Button";
import { useNavigate } from "react-router-dom";

export default function Quizzes() {
  const { quizzes } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleNewQuiz = () => {
    navigate("/quizzes/new");
  };

  return (
    <div className="p-6">
      <Button label="Create New Quiz" onClick={handleNewQuiz} />

      <div className="p-4 flex flex-wrap gap-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            href={`/quizzes/${quiz.id}`}
            title={quiz.title}
            description={quiz.description}
            extra={{ score: quiz.score, url: quiz.url }}
          />
        ))}
      </div>
    </div>
  );
}
