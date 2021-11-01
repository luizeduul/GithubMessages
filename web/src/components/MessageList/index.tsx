import { useEffect, useState } from "react";
import logoImg from "../../assets/logo.svg";
import styles from "./styles.module.scss";

import { api } from "../../services/api";

interface IMessageType {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export const MessageList = () => {
  const [messages, setMessages] = useState<IMessageType[]>([]);

  useEffect(() => {
    api.get("/messages/last-three").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="logo" />
      {messages.map((message) => (
        <ul className={styles.messageList}>
          <li className={styles.message}>
            <p className={styles.messageContent}>
              {message.text}
            </p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};
