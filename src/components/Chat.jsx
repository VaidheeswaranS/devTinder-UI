import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      };
    });

    // updating the local state variable
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    // As soon as the page loads socket connection is made and joinChat event is emitted to the backend
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);

      // updating the state value with the message received
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // this function will be called when the component unmounts from the page. we are disconnecting the socket when Chat component unmounts
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    // sendMessage event is emitted
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  if (!user) {
    return;
  } else {
    return (
      <div className="my-10 mx-auto w-2/3 h-[60vh] text-center items-center flex flex-col border border-white">
        <h1 className="text-2xl text-white items-center border-b w-full mb-2 py-4">
          Chat
        </h1>
        <div className="flex-1 overflow-scroll py-3 px-3 w-full">
          {messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  user.firstName === msg.firstName ? "chat-end" : "chat-start"
                }
              >
                <div className="chat-header mb-1">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row border-t w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
            className="mx-4 my-3 px-2 py-1 flex-1 rounded-lg bg-gray-500 text-white"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          ></input>
          <button
            className="bg-pink-500 px-5 py-1 my-3 mr-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
};

export default Chat;
