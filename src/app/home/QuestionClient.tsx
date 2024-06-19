"use client";

import { QuestionModel } from "@/api/questions";
import Question from "@/components/Question/Question";
import { useQStateStore } from "@/stores/qustions/provider";
import { QStateModel } from "@/stores/qustions/store";

export interface QuestionClientProps {
  questions: QuestionModel[];
}

export default function QuestionClient({ questions }: QuestionClientProps) {
  const qState = useQStateStore((state) => state.qState);
  const updateQState = useQStateStore((state) => state.updateQState);

  const getQSetter = (id: number) => {
    return (data: QStateModel) => updateQState(id, data);
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
