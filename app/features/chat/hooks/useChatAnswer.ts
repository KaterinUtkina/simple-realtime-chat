import {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AudioRecorderPlugin } from "audio-recorder-plugin";
import { MessageContent } from "@/app/features/chat/types";
import { KeyboardKey } from "@/app/features/chat/enum";

type ChatAnswerAreaProps = {
  sendAnswerHandler: (content: MessageContent) => void;
  isTouchDevice: boolean;
};

export function useChatAnswer(props: ChatAnswerAreaProps) {
  const [answer, setAnswer] = useState<string>("");
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_ROWS = 6;
  const [isRecord, setIsRecord] = useState(false);
  const recorder = useRef(new AudioRecorderPlugin());
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const submitHandler = useCallback(() => {
    if (!(answer.length || audio)) return;

    const message = audio ? audio : answer;

    props.sendAnswerHandler(message);
    resetData();
  }, [answer, audio, props]);

  useEffect(() => {
    if (audio) {
      submitHandler();
    }
  }, [audio, submitHandler]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);

    const previousRows = event.target.rows;
    event.target.rows = 1;

    const lineHeightPx = parseFloat(getComputedStyle(event.target).lineHeight);
    const currentRows = Math.ceil(event.target.scrollHeight / lineHeightPx);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows > MAX_ROWS) {
      event.target.rows = MAX_ROWS;
    }

    setRows(currentRows < MAX_ROWS ? currentRows : MAX_ROWS);
  };

  const handleBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = answer.length;
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === KeyboardKey.ENTER && event.shiftKey) {
      return;
    }

    if (event.key === KeyboardKey.ENTER) {
      event.preventDefault();

      submitHandler();
    }
  };

  const resetData = () => {
    setAnswer("");
    setRows(1);
    setAudio(null);
  };

  const settingsTextarea = props.isTouchDevice
    ? {
        autoFocus: false,
      }
    : {
        autoFocus: true,
        onBlur: handleBlur,
      };

  const recordHandler = () => {
    return isRecord ? stopRecord() : startRecord();
  };

  const startRecord = async () => {
    try {
      await recorder.current.init();
      await recorder.current.startRecording();
      setIsRecord(true);
    } catch (error) {
      console.error("Error starting the audio recorder:", error);
    }
  };

  const stopRecord = async () => {
    try {
      const audio = await recorder.current.stopRecording();
      setIsRecord(false);
      setAudio(audio);
    } catch (error) {
      console.error("Error stopping the audio recorder:", error);
    }
  };

  return {
    rows,
    handleChange,
    handleKeyDown,
    submitHandler,
    settingsTextarea,
    textareaRef,
    answer,
    recordHandler,
    isRecord,
  };
}
