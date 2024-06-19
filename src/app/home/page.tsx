import { getQuestions } from "@/api/questions";
import QuestionClient from "./QuestionClient";
import StoreProvider from "@/stores/qustions/provider";
import { QStateModel } from "@/stores/qustions/store";

export default async function HomePage() {
  const questions = await getQuestions();

  const qState: QStateModel[] = questions.map((q) => ({
    id: q.id,
    answer: "",
    hasError: false,
  }));

  return (
    <StoreProvider questionInit={qState}>
      <QuestionClient questions={questions} />;
    </StoreProvider>
  );
}
