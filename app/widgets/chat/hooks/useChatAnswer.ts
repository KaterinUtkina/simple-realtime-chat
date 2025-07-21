import {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AudioRecorderPlugin } from "audio-recorder-plugin";
import { MessageContent } from "@/app/entities/chat/types";
import { ChatMessageTypes, KeyboardKey } from "@/app/widgets/chat/enum";
import { websocketService } from "@/app/shared/services/WebsoketService";
import { useSelector } from "react-redux";
import { isTouchDevice, userId } from "@/app/entities/chat/model/selectors";
import { getAudioDataUrl } from "@/app/shared/helpers/common";

export function useChatAnswer() {
  const [answer, setAnswer] = useState<string>("");
  const [rows, setRows] = useState(1);
  const [isRecord, setIsRecord] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_ROWS = 6;
  const recorder = useRef(new AudioRecorderPlugin());
  const currentUser = useSelector(userId);
  const isTouch = useSelector(isTouchDevice);

  const sendAnswerHandler = useCallback(
    async (content: MessageContent) => {
      if (!currentUser) return;

      let params = {};
      if (typeof content === "string") {
        params = {
          author: currentUser,
          content,
          type: ChatMessageTypes.USER,
        };
      } else if (content instanceof HTMLAudioElement) {
        try {
          const audioUrl = await getAudioDataUrl(content);
          params = {
            author: currentUser,
            content: audioUrl,
            type: ChatMessageTypes.USER_AUDIO,
          };
        } catch (err) {
          console.log("Ошибка получения url записи", err);
        }
      }
      websocketService.sendMessage("user_chat", params);
    },
    [currentUser],
  );

  const submitHandler = useCallback(async () => {
    if (!(answer.length || audio)) return;

    const message = audio ? audio : answer;

    await sendAnswerHandler(message);
    resetData();
  }, [answer, audio, sendAnswerHandler]);

  useEffect(() => {
    if (audio) {
      void submitHandler();
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

      void submitHandler();
    }
  };

  const resetData = () => {
    setAnswer("");
    setRows(1);
    setAudio(null);
  };

  const settingsTextarea = {
    autoFocus: !isTouch,
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
