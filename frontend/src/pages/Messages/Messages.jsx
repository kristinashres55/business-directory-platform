import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Messages.css";

const Messages = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/messages/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };

    fetchConversations();
  }, []);

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        {
          receiver: selectedUser._id,
          content: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="messages-page">
      <div className="conversations">
        <h3>Messages</h3>
        {conversations.length === 0 ? (
          <p>No messages. Please check back later.</p>
        ) : (
          conversations.map((conv) => (
            <div key={conv._id} onClick={() => selectUser(conv)} className={`conversation-item ${selectedUser?._id === conv._id ? 'active' : ''}`}>
              <div className="avatar">{conv.name[0]}</div>
              <div>
                <p>{conv.name}</p>
                <p className="email">{conv.email}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="chatbox">
        {selectedUser ? (
          <>
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.sender === user._id ? "msg sent" : "msg received"}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p className="no-chat">Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
