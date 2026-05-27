import React from 'react'

interface FrequentlyAskedQuestionProps {
    question: string;
    answer: string;
    fontSize?: number;
}

const FrequentlyAskedQuestion = ({
    question,
    answer,
    fontSize = 28
}: FrequentlyAskedQuestionProps) => {
  return (
    <div
        style={{fontSize: fontSize}}
        className="w-full flex flex-col px-32 gap-y-5">
        <div className="font-bold">Q: {question}</div>
        <div>A: {answer}</div>
    </div>
  )
}

export default FrequentlyAskedQuestion