"use client";

import { QuestionModel } from "@/api/questions";
import { ChangeEvent, useState } from "react";

export interface QuestionProps {
  question: QuestionModel;
  setQState: (data: any) => void;
}

export default function Question({ question, setQState }: QuestionProps) {
  const [value, setValue] = useState("");

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);

    if (ev.target.value === "10") {
      setQState({
        id: question.id,
        answer: ev.target.value,
        hasError: true,
      });
    }
  };

  return (
    <div>
      <p>{question.question}</p>
      <input value={value} onChange={onChange} />
    </div>
  );
}
