import { Button } from "./ui/button";

type Props = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}



export default function QuizCard({ ...props }: Props) {
    const answers = [props.correct_answer, ...props.incorrect_answers];
    answers.sort(() => Math.random() - 0.5); // Shuffle answers

    return (
        <section className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8 dark:bg-gray-800">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        Quiz Question
                    </h2>
                </div>
                <div className="rounded-md shadow-lg bg-white dark:bg-gray-700 p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                        {props.question}
                    </h3>
                    {answers.map((element, index) => (
                        <Button 
                            key={index}
                            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                        >
                            {element}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Timer: 30s
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Score: 0
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
