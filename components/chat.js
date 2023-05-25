import ChatBubble from "./chat-bubble";
import ChatForm from "./chat-form";
import { useState, useEffect } from "react";
import Typing from "./typing";
import Error from "./error";
function Chat() {
  const [chats, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const [stream, setStream] = useState("");
  const fetchChatData = async () => {
    try {
      const response = await fetch("api/chat");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const chatData = await response.json();
      setChat(chatData.data);
      setStream('');
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

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
                let updatedResponse;
                let thumbnailUrl;
                let imageUrl;
                const linkRegex =
                  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#\-\s]*[\w@?^=%&\/~+#-])/;

                const match = response.match(linkRegex);

                if (!match) {
                  updatedResponse = response;
                } else {
                  const pattern = /<iframe\s+.*?>.*?<\/iframe>/i;
                  const imageUrlRegExp =
                    /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

                  const imageUrlMatch = response.match(imageUrlRegExp);
                  if (pattern.test(response)) {
                    thumbnailUrl = `https://img.youtube.com/vi/${match[0].substring(
                      match[0].indexOf("embed/") + 6
                    )}/0.jpg`;
                  } else if (imageUrlMatch) {
                    imageUrl = imageUrlMatch[0];
                  }

                  const anchorRegex =
                    /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/i;
                  if (anchorRegex.test(response)) {
                    updatedResponse = response;
                  } else {
                    let htmlPattern = /(<([^>]+)>)/gi;
                    if (linkRegex.test(response)) {
                      updatedResponse = response.replace(
                        linkRegex,
                        (matchs, p1) => {
                          if (p1.startsWith("</")) {
                            return `</a>`;
                          } else {
                            return `<a href="${match[0]}" target="_blank" style="text-decoration: underline; color: #0096FF;">${match[0]}`;
                          }
                        }
                      );
                    }
                    if (htmlPattern.test(response)) {
                      updatedResponse = response.replace(
                        htmlPattern,
                        (matchs, p1) => {
                          if (p1.startsWith("</")) {
                            return `</a>`;
                          } else {
                            return `<a href="${match[0]}" target="_blank" style="text-decoration: underline; color: #0096FF;">${match[0]}`;
                          }
                        }
                      );
                    }
                    // Replace HTML tags with <a> elements
                  }
                }

                return (
                  <ChatBubble
                    key={index}
                    updatedResponse={updatedResponse}
                    imageUrl={imageUrl}
                    thumbnailUrl={thumbnailUrl}
                    role={chat.role}
                  />
                );
              }
            })}
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
