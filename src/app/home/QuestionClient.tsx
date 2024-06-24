"use client";

import { QuestionModel } from "@/api/questions";
import Question from "@/components/Question/Question";
import { QStateModel, RootState, updateQState } from "@/stores/qustions/store";
import { useDispatch, useSelector } from "react-redux";

export interface QuestionClientProps {
  questions: QuestionModel[];
}

export default function QuestionClient({ questions }: QuestionClientProps) {
  const qState: QStateModel[] = questions.map((q) => ({
    id: q.id,
    answer: "",
    hasError: false,
  }));
  const qState = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();

  const getQSetter = (id: number) => {
    return (data: QStateModel) =>
      dispatch(updateQState({ id, newState: data }));
  };

  const errorQ = qState.find((q) => q.hasError === true);

  return (
    <div>
      {errorQ && (
        <div>
          Invalid answer {errorQ.answer} for:: {errorQ?.id}
        </div>
      )}

      {questions.map((q) => (
        <Question key={q.question} question={q} setQState={getQSetter(q.id)} />
      ))}
    </div>
  );
}
