import { Tables } from "@/types/supabase";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  quizData: Tables<"questions">[];
  sessionData: Tables<"questions">[];
  currentQuestion: Tables<"questions">;
  currentQuestionIndex: number;
  start: boolean;
  end: boolean;
  score: number;
  timer: number;
  pauseTimer: boolean;
  selectedAnswer: string;
};

type Action = {
  updateCurrentQuestion: (currentQuestion: State["currentQuestion"]) => void;
  updateCurrentQuestionIndex: (
    currentQuestionIndex: State["currentQuestionIndex"]
  ) => void;
  incrementScore: (increment: number) => void;
  incrementTimer: (increment: number) => void;
  startQuiz: () => void;
  endQuiz: () => void;
  pauseTicking: () => void;
  resumeTicking: () => void;
  updateSelectedAnswer: (selectedAnswer: string) => void;
  submitSelectedAnswer: () => void;
  nextQuestion: () => void;
};

export type QuizStore = State & Action;

const UseQuizStore = create(
  persist<QuizStore>(
    (set) => ({
      quizData: [],
      sessionData: [],
      currentQuestionIndex: 0,
      score: 0,
      timer: 30,
      start: false,
      end: false,
      pauseTimer: true,
      selectedAnswer: String(""),
      currentQuestion: {} as Tables<"questions">,
      updateCurrentQuestion: () => {
        set((state) => ({
          currentQuestion: state.quizData[state.currentQuestionIndex],
        }));
      },
      updateCurrentQuestionIndex: () => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }));
      },
      incrementScore: (increment: number) => {
        set((state) => ({ score: state.score + increment }));
      },
      incrementTimer: (increment: number) => {
        set((state) => ({ timer: state.timer + increment }));
      },
      startQuiz: () => {
        set({ start: true });
      },
      endQuiz: () => {
        set({ end: true });
      },
      pauseTicking: () => {
        set({ pauseTimer: true });
      },
      resumeTicking: () => {
        set({ pauseTimer: false });
      },
      updateSelectedAnswer: (selectedAnswer: string) => {
        set((state) => ({
          selectedAnswer: selectedAnswer,
          currentQuestion: {
            ...state.currentQuestion,
            selected_Answer: selectedAnswer,
          },
        }));
      },
      submitSelectedAnswer: () => {
        set((state) => ({
          currentQuestion: {
            ...state.currentQuestion,
            selected_Answer: state.selectedAnswer,
          },
        }));
      },
      nextQuestion: () => {
        set((state) => {
          if (state.currentQuestionIndex < state.quizData.length) {
            return {
              currentQuestion: state.quizData[state.currentQuestionIndex],
            };
          } else return { end: true };
        });
      },
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default UseQuizStore;
