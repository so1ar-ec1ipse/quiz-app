import Button from "./tailwind/Button";
import Input from "./tailwind/Input";

export default function QuizForm({ quiz, setQuiz, onSubmit }) {
  const appendAnswer = (qIndex) => {
    quiz.questions_answers[qIndex].answers.push({ id: null, is_true: false, text: "" });
    setQuiz({ ...quiz });
  };

  const deleteAnswer = (qIndex, aIndex) => {
    quiz.questions_answers[qIndex].answers[aIndex] = null;
    setQuiz({ ...quiz });
  };

  const appendQuestion = () => {
    quiz.questions_answers.push({
      id: null,
      answer_id: null,
      text: "",
      answers: [],
      feedback_false: "",
      feedback_true: "",
    });
    setQuiz({ ...quiz });
  };

  const deleteQuestion = (qIndex) => {
    quiz.questions_answers[qIndex] = null;
    setQuiz({ ...quiz });
  };

  return (
    <form className="p-6" onSubmit={onSubmit}>
      <div className="mb-4">
        <Button href="/" label="Go To Home" className="mr-2" />
        <Button type="submit" label="Save" />
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <b>Title:</b>
          <Input defaultValue={quiz?.title} name="title" required />
        </div>
        <div className="flex items-center gap-2">
          <b>Description:</b>
          <Input defaultValue={quiz?.description} name="description" required />
        </div>
        <div className="flex items-center gap-2">
          <b>Score:</b>
          <Input type="number" defaultValue={quiz?.score} name="score" required />
        </div>
        <div className="flex items-center gap-2">
          <b>Media url:</b>
          <Input defaultValue={quiz?.url} name="url" required />
        </div>
      </div>

      <>
        {quiz?.questions_answers?.map((qaSet, quesIndex) => (
          <div key={quesIndex}>
            {qaSet ? (
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <b>Q{quesIndex + 1}:</b>
                  <Input type="hidden" defaultValue={qaSet?.id} name={`question-${quesIndex}-id`} />
                  <Input defaultValue={qaSet.text} name={`question-${quesIndex}`} required />
                  <Button
                    size="xs"
                    label="X"
                    className="text-white"
                    onClick={() => deleteQuestion(quesIndex)}
                  />
                </div>

                <div className="mt-4 ml-8 italic">Answers</div>
                {qaSet?.answers?.map((answer, ansIndex) => (
                  <div key={ansIndex}>
                    {answer ? (
                      <div className="ml-8 flex items-center gap-2 mt-2">
                        <Input
                          type="radio"
                          id={`answer-${quesIndex}:${ansIndex}`}
                          name={`qa-set-${quesIndex}`}
                          defaultChecked={answer.is_true}
                          required
                        />

                        <Input
                          type="hidden"
                          defaultValue={answer?.id}
                          name={`answer-${quesIndex}:${ansIndex}-id`}
                        />
                        <Input
                          defaultValue={answer.text}
                          name={`answer-${quesIndex}:${ansIndex}`}
                          required
                        />
                        <Button
                          size="xs"
                          label="X"
                          className="text-white"
                          onClick={() => deleteAnswer(quesIndex, ansIndex)}
                        />
                      </div>
                    ) : (
                      <Input type="hidden" name={`answer-${quesIndex}:${ansIndex}`} />
                    )}
                  </div>
                ))}

                <Button
                  size="xs"
                  label="+"
                  className="ml-14   mt-2"
                  onClick={() => appendAnswer(quesIndex)}
                />

                <div>
                  <div className="ml-8 flex items-center gap-1 mt-2">
                    Feedback false:
                    <Input
                      defaultValue={qaSet.feedback_false}
                      name={`question-${quesIndex}-feedback-false`}
                      required
                    />
                  </div>
                  <div className="ml-8 flex items-center gap-1 mt-2">
                    Feedback true:
                    <Input
                      defaultValue={qaSet.feedback_true}
                      name={`question-${quesIndex}-feedback-true`}
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Input type="hidden" name={`question-${quesIndex}`} />
            )}
          </div>
        ))}

        <Button label="Create a question" className="mt-2" onClick={() => appendQuestion()} />
      </>
    </form>
  );
}
