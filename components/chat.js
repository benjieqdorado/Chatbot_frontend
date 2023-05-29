import ChatBubble from "./chat-bubble";
import ChatForm from "./chat-form";
import { useState, useEffect, useRef } from "react";
import Typing from "./typing";
import Error from "./error";
import FormatResponse from "@/helper/format-response";
function Chat() {
  const [chats, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const [stream, setStream] = useState("");
  const messageEndRef = useRef(null);
  const fetchChatData = async () => {
    try {
      const response = await fetch("api/chat");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const chatData = await response.json();
      setChat(chatData.data);
      setStream("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [chats]);
  return (
    <div
      className="main flex-1 flex flex-col max-w-3xl"
      style={{ minHeight: 40 + "rem" }}
    >
      <div className="hidden lg:block heading flex-2">
        <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
      </div>
      <div className="flex-1 flex" style={{ maxHeight: 40 + "rem" }}>
        <div className="chat-area flex-1 flex flex-col shadow-md p-4 rounded-md">
          <div className="flex-3">
            <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
              Chatting with <b>Chatbot</b>
            </h2>
          </div>
          <div className="messages flex-1 overflow-auto">
            {chats.map((chat, index) => {
              if (chat.role !== "system" && chat.message !== "") {
                const response = chat.message;
                const { updatedResponse, imageUrl } = FormatResponse(response);

                return (
                  <ChatBubble
                    key={index}
                    updatedResponse={updatedResponse}
                    imageUrl={imageUrl}
                    role={chat.role}
                  />
                );
              }
            })}
            <div ref={messageEndRef}></div>

            {typing ? <Typing /> : null}
            {error ? <Error /> : null}

            {stream !== "" ? (
              <div className="message mb-4 flex">
                <div className="flex-2">
                  <div className="w-12 h-12 relative">
                    <img
                      className="w-12 h-12 rounded-full mx-auto"
                      src="./resources/chatbot.png"
                      alt="chat-user"
                    />
                    <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white" />
                  </div>
                </div>
                <div className="flex-1 px-2">
                  <div className="inline-block bg-gray-300 rounded-md p-2 px-6 text-gray-700">
                    {stream}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          
          <ChatForm
            fetchChatData={fetchChatData}
            setChat={setChat}
            setTyping={setTyping}
            setError={setError}
            setStream={setStream}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
