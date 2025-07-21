import { memo } from "react";
import { useChatAnswer } from "@/app/widgets/chat/hooks/useChatAnswer";
import MicrophoneIcon from "@/app/shared/ui/icon/MicrophoneIcon.svg";
import StopIcon from "@/app/shared/ui/icon/StopIcon.svg";
import SendIcon from "@/app/shared/ui/icon/SendIcon.svg";

const ChatAnswerArea = memo(function ChatAnswerArea() {
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
    <div onKeyDown={handleKeyDown} className={"pb-4"}>
      <div className={"flex gap-2 relative"}>
        <label className={"grow shadow-md rounded-md p-3 bg-white flex"}>
          <textarea
            className={"resize-none focus:outline-none w-full mr-24"}
            rows={rows}
            ref={textareaRef}
            onChange={handleChange}
            value={answer}
            placeholder={"Enter answer here..."}
            {...settingsTextarea}
          ></textarea>
        </label>
        <button
          type={"button"}
          className={
            "rounded-md p-1 shrink-0 mt-auto absolute right-14 bottom-1.5"
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
            "bg-violet-400 p-2.5 rounded-md shrink-0 mt-auto absolute right-2 bottom-1.5"
          }
          onClick={submitHandler}
        >
          <SendIcon className={"w-4 h-4 fill-white"} />
        </button>
      </div>
    </div>
  );
});

export default ChatAnswerArea;
