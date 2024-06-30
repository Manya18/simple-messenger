import { useEffect, useState } from "react";
import styles from "./messenger.module.css";
import { MessageType } from "../../../types/MessageType";
import MessageList from "../messageList/MessageList";
import { adsCardType } from "../../../types/AdsCardType";

const Messenger = ({
  ad,
  onClose,
}: {
  ad: adsCardType;
  onClose: () => void;
}) => {
  const storageKey = `chatHistory_${ad.Name}_${ad.Image}`;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    ) as string[];
    setQuestions(storedQuestions);
  }, []);

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(storageKey) || "[]") as MessageType[];
    setMessages(chatHistory);
  }, [storageKey]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setMessages((prevMes) => [
        ...prevMes,
        { type: "question", text: questions[currentQuestionIndex] },
      ]);
    }
  }, [currentQuestionIndex, questions]);

  const handleSendMessage = (text: string) => {
    const newMessage: MessageType = { type: "answer", text };
    
    setMessages((prevMes) => [...prevMes, newMessage]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    
    const updatedMessages = [...messages, newMessage];
    localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length !== 0) {
      setInputError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue("");
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <div className={styles.messenger}>
      <div className={styles.messengerHeader}>
        <button className={styles.messengerButton} onClick={onClose}>
          х
        </button>
      </div>
      <MessageList props={messages} />
      <form className={styles.messengerForm} onSubmit={handleSubmit}>
        <textarea
          className={`${styles.messengerInput} ${
            inputError ? styles.inputError : ""
          }`}
          placeholder="Write a message"
          value={inputValue}
          onChange={handleChange}
        />
        <button className={styles.messengerButton} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Messenger;
