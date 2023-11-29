import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuizContextProvider } from "./contexts/QuizContext";
import QuizeList from "./pages/quizzes";
import QuizView from "./pages/quizzes/view";
import QuizNew from "./pages/quizzes/new";
import QuizEdit from "./pages/quizzes/edit";

function App() {
  return (
    <QuizContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<QuizeList />} />
            <Route path="/quizzes" element={<QuizeList />} />
            <Route path="/quizzes/new" element={<QuizNew />} />
            <Route path="/quizzes/:id" element={<QuizView />} />
            <Route path="/quizzes/:id/edit" element={<QuizEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QuizContextProvider>
  );
}

export default App;
