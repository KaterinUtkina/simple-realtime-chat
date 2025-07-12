"use client"
import {WarningIcon} from "@/app/shared/ui/icon/WarningIcon";
import {ClockIcon} from "@/app/shared/ui/icon/ClockIcon";
import {RotateIcon} from "@/app/shared/ui/icon/RotateIcon";
import {memo} from "react";
import {Answer} from "@/app/features/chat/types";

type Props = {
  answer: Answer;
  questionId: string;
  isLastAnswer: boolean;
  answerIndex: number;
  activeQuestionId: string | null;
  answerLoading: boolean;
  reloadAnswer: (index: number) => void;
};

const ChatAnswer = memo(function ChatAnswer({
  answer,
  questionId,
  isLastAnswer,
  answerIndex,
  activeQuestionId,
  answerLoading,
  reloadAnswer,
}: Props) {
  const isLoading = activeQuestionId === questionId && isLastAnswer && answerLoading;

  const answerText = [...answer.options, ...answer.answer]
    .filter((item) => item.length)
    .join(", ");

  if (!answerText.length && !answer.audio) return null;

  return (
    <div className="flex justify-end relative mb-5 gap-3">
      {answer.warning && (
        <WarningIcon className="w-5 h-5 fill-red-900 self-center shrink-0" />
      )}
      <div
        className={`p-3 rounded-2xl bg-white max-w-lg shadow-md ${
          isLoading || (answer.warning && isLastAnswer) ? "pr-8" : ""
        }`}
      >
        <p className="break-words">{answerText}</p>
        {answer.audio && <audio src={answer.audio.src} controls />}
      </div>
      <div className="flex absolute bottom-1 right-1.5 gap-1">
        {isLoading && <ClockIcon className="w-4 h-4 fill-gray-600" />}
        {!isLoading && answer.warning && isLastAnswer && (
          <button onClick={() => reloadAnswer(answerIndex)} type="button">
            <RotateIcon className="w-4 h-4 fill-red-900 hover:fill-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
});

export default ChatAnswer;