import React, { createContext, useState } from "react";
import sampleQuizzes from "../data/sampleQuizzes.json";

export const QuizContext = createContext({ quizzes: [], setQuizzes: () => {} });

export function QuizContextProvider({ children }) {
  const [quizzes, setQuizzes] = useState(sampleQuizzes ?? []);

  return <QuizContext.Provider value={{ quizzes, setQuizzes }}>{children}</QuizContext.Provider>;
}
