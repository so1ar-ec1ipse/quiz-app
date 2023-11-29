export function findQuizById(quizzes, id) {
  return quizzes.find((quiz) => String(quiz.id) === String(id));
}

function generateId() {
  return Math.floor(Math.random() * 1e10);
}

function buildQuizFromFormValues(quiz, formValues) {
  let curTime = new Date().toISOString();
  curTime = `${curTime.slice(0, 10)} ${curTime.slice(11, 19)}`;

  let newQuiz = {
    id: Number(quiz?.id ?? generateId()),
    title: formValues.title.value,
    description: formValues.description.value,
    score: Number(formValues.score.value),
    url: formValues.url.value,
    created: quiz?.created ?? curTime,
    modified: curTime,
    questions_answers: [],
  };

  for (let quesIndex = 0; ; quesIndex++) {
    if (!formValues[`question-${quesIndex}`]) break;
    if (!formValues[`question-${quesIndex}`].value) continue;

    const questionId = formValues[`question-${quesIndex}-id`]?.value;

    let qaSet = {
      id: Number(questionId ? questionId : generateId()),
      text: formValues[`question-${quesIndex}`].value,
      answer_id: null,
      answers: [],
      feedback_false: formValues[`question-${quesIndex}-feedback-false`].value,
      feedback_true: formValues[`question-${quesIndex}-feedback-true`].value,
    };

    for (let ansIndex = 0; ; ansIndex++) {
      if (!formValues[`answer-${quesIndex}:${ansIndex}`]) break;
      if (!formValues[`answer-${quesIndex}:${ansIndex}`]?.length) continue;

      const answerId = formValues[`answer-${quesIndex}:${ansIndex}-id`]?.value;

      qaSet.answers.push({
        id: Number(answerId ? answerId : generateId()),
        is_true: formValues[`answer-${quesIndex}:${ansIndex}`][0].checked,
        text: formValues[`answer-${quesIndex}:${ansIndex}`][1].value,
      });
    }

    newQuiz.questions_answers.push(qaSet);
  }

  return newQuiz;
}

export function updateQuizByIdWithFormValues(quizzes, setQuizzes, id, formValues) {
  setQuizzes(
    quizzes.map((quiz) =>
      String(quiz.id) !== String(id) ? quiz : buildQuizFromFormValues(quiz, formValues)
    )
  );
}

export function createQuizWithFormValues(quizzes, setQuizzes, formValues) {
  setQuizzes([...quizzes, buildQuizFromFormValues({}, formValues)]);
}
