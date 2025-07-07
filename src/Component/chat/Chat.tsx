import { useEffect, useState, useRef } from "react";
import {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMassegesMutation,
} from "../../Services/chatApi.js";
import { supabase } from "../../Supabase/supabaseClient";
import type { Message } from "../../Services/chatApi";
import "./chat.css";

const ChatPage = () => {
  const { data, isLoading } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMassegesMutation();

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [sender, setSender] = useState("user");
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("Change received!", payload);

          if (payload.eventType === "INSERT") {
            const newMsg = payload.new as Message;

            setMessages((prev) => [...prev, newMsg]);

            if (Notification.permission === "granted") {
              new Notification("New Message", {
                body: `${newMsg.username}: ${newMsg.text}`,
              });
            }
          } else if (payload.eventType === "DELETE") {
            setMessages((prev) =>
              prev.filter((msg) => msg.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (username && text) {
      await addMessage({
        username,
        text,
        sender,
      });
      setText("");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Supabase Realtime Chat</h2>
      <div className="controls">
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="sender-select"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="chat-input"
        />

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="message"
          className="chat-input"
        />

        <button onClick={handleSend} className="send-btn">
          Send
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
            >
              <div className="message-header">
                <b>{msg.username}</b>{" "}
                <span className="time">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-text">{msg.text}</div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(msg.id)}
              >
                Delete
              </button>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
