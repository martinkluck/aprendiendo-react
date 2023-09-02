import { create } from 'zustand';
import { type Question } from '../types.d';
import confetti from 'canvas-confetti';
import { persist, devtools } from 'zustand/middleware';
import { getAllQuestions } from '../services/questions';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

// const logger = (config) => (set, get, api) => {
//   return config(
//     (...args) => {
//       console.log('  applying', args);
//       set(...args);
//       console.log('  new state', get());
//     },
//     get,
//     api
//   );
// }

export const useQuestionsStore = create<State>()(
  // logger(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit) => {
          const data = await getAllQuestions();
          set(
            {
              questions: data.sort(() => Math.random() - 0.5).slice(0, limit),
            },
            false,
            'FETCH_QUESTIONS'
          );
        },
        selectAnswer: (questionId, answerIndex) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
          newQuestions[questionIndex] = {
            ...questionInfo,
            userSelectedAnswer: answerIndex,
            isCorrectUserAnswer,
          };
          set({ questions: newQuestions }, false, 'SELECT_ANSWER');
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION');
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;
          if (previousQuestion >= 0) {
            set(
              { currentQuestion: previousQuestion },
              false,
              'GO_PREVIOUS_QUESTION'
            );
          }
        },
        reset: () => {
          set({ questions: [], currentQuestion: 0 }, false, 'RESET');
        },
      }),
      { name: 'questions' }
    )
  )
  // )
);
