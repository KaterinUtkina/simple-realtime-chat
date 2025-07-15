import ChatMessageScroll from "@/app/features/chat/ui/ChatMessageScroll";
import ChatQuestion from "@/app/features/chat/ui/ChatQuestion";
import ChatAnswer from "@/app/features/chat/ui/ChatAnswer";
import LoadingQuestion from "@/app/features/chat/ui/LoadingQuestion";
import { QuestionTemplate } from "@/app/features/chat/types";

type ChatMessageProps = {
  questions: QuestionTemplate[];
  questionLoading: boolean;
  activeQuestionId: string | null;
  answerLoading: boolean;
  reloadAnswer: (index: number) => void;
};

const ChatMessages = (props: ChatMessageProps) => {
  return (
    <ChatMessageScroll>
      <ul className={"w-full md:w-7/12 mx-auto px-4 md:px-0 py-5"}>
        {props.questions.map((questionItem) => (
          <li key={questionItem.id}>
            <ChatQuestion text={questionItem.text} />
            {questionItem.answer.map((answerItem, index) => (
              <ChatAnswer
                key={index}
                answer={answerItem}
                questionId={questionItem.id}
                isLastAnswer={questionItem.answer.length - 1 === index}
                answerIndex={index}
                activeQuestionId={props.activeQuestionId}
                answerLoading={props.answerLoading}
                reloadAnswer={props.reloadAnswer}
              />
            ))}
          </li>
        ))}
        {props.questionLoading && <LoadingQuestion />}
      </ul>
    </ChatMessageScroll>
  );
};

export default ChatMessages;
