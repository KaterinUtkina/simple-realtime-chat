import {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AudioRecorderPlugin } from "audio-recorder-plugin";
import { KeyboardKey } from "@/app/widgets/chat/enum";
import { useDispatch, useSelector } from "react-redux";
import { isTouchDevice } from "@/app/entities/chat/model/selectors";
import { sendMessageThunk } from "@/app/entities/chat/model/thunks";
import { RootDispatch } from "@/app/shared/store/types";

export function useChatAnswer() {
  const [answer, setAnswer] = useState<string>("");
  const [rows, setRows] = useState(1);
  const [isRecord, setIsRecord] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_ROWS = 6;
  const recorder = useRef(new AudioRecorderPlugin());
  const isTouch = useSelector(isTouchDevice);
  const dispatch = useDispatch<RootDispatch>();

  const submitHandler = useCallback(async () => {
    if (!(answer.length || audio)) return;

    const message = audio ? audio : answer;

    dispatch(sendMessageThunk(message));
    resetData();
  }, [answer, audio, dispatch]);

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

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
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
