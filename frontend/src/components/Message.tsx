import "./Message.css";

interface MessageProps {
  message: string;
  messageType: string;
}

const Message: React.FC<MessageProps> = ({ message, messageType }) => {
  return (
    <section
      className={`${messageType} message`}
      cypress-test={`create-song-${messageType}-message`}
    >
      {message}
    </section>
  );
};

export default Message;
