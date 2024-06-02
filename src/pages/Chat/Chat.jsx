import { useEffect, useState } from "react";
import io from "socket.io-client";
import { filesServerUrl } from "../../redux/api/authApi";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(messages);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client connected");
    });

    socket.on("new message", (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });

    return () => {
      socket.off("new message");
      socket.disconnect();
    };
  }, [socket]);

  const handleCreateMessage = (e) => {
    e.preventDefault();
    socket.emit("new message", messageInput);
    setMessageInput("");
  };
  return (
    <div>
      {messages.map((message, key) => (
        <div key={key}>
          {message.type === "system" ? (
            <div className="center">
                 {message.message}
            </div>
          ) : (
            <>
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${filesServerUrl}/avatar/${message.user.avatar}`}
                  alt=""
                />
                {message.user.username}
              </div>
              {message.message}
            </>
          )}
        </div>
      ))}
      <form onSubmit={handleCreateMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
