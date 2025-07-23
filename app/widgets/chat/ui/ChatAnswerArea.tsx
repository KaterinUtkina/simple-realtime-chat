import { useChatAnswer } from "@/app/widgets/chat/hooks/useChatAnswer";
import MicrophoneIcon from "@/app/shared/ui/icon/MicrophoneIcon.svg";
import StopIcon from "@/app/shared/ui/icon/StopIcon.svg";
import SendIcon from "@/app/shared/ui/icon/SendIcon.svg";

const ChatAnswerArea = () => {
  const {
    rows,
    handleChange,
    handleKeyDown,
    submitHandler,
    settingsTextarea,
    textareaRef,
    answer,
    recordHandler,
    isRecord,
  } = useChatAnswer();

  return (
    <form onKeyDown={handleKeyDown} className={"mb-4"}>
      <div className={"flex gap-2 relative"}>
        <div
          className={
            "grow shadow-md rounded-md p-4 bg-white dark:bg-gray-800 flex"
          }
        >
          <textarea
            className={"resize-none focus:outline-none w-full mr-24"}
            rows={rows}
            ref={textareaRef}
            onChange={handleChange}
            value={answer}
            placeholder={"Enter answer here..."}
            {...settingsTextarea}
          ></textarea>
        </div>
        <button
          type={"button"}
          className={
            "rounded-md p-1 shrink-0 mt-auto absolute right-14 bottom-2"
          }
          onClick={recordHandler}
        >
          {isRecord ? (
            <StopIcon className={"w-7 h-7 fill-violet-400"} />
          ) : (
            <MicrophoneIcon className={"w-7 h-7 fill-violet-400"} />
          )}
        </button>
        <button
          type={"button"}
          className={
            "bg-violet-400 p-2.5 rounded-md shrink-0 mt-auto absolute right-2 bottom-2"
          }
          onClick={submitHandler}
        >
          <SendIcon className={"w-4 h-4 fill-white"} />
        </button>
      </div>
    </form>
  );
};

export default ChatAnswerArea;
