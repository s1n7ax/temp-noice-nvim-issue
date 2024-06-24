import { getQuestions } from "@/api/questions";
import StoreProvider from "@/stores/qustions/provider";
import QuestionClient from "./QuestionClient";

export default async function HomePage() {
  const questions = await getQuestions();

  return (
    <StoreProvider>
      <QuestionClient questions={questions} />;
    </StoreProvider>
  );
}
