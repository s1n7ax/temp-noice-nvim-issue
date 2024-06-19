const wait = (timeout: number) => {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
};

export interface QuestionModel {
  id: number;
  question: string;
}

export const getQuestions = async (): Promise<QuestionModel[]> => {
  await wait(1000);

  return [
    {
      id: 1,
      question: "what is your name",
    },
    {
      id: 2,
      question: "what is your email",
    },
  ];
};
