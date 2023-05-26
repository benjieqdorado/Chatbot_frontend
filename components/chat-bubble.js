import Image from "next/image";

function ChatBubble({ updatedResponse, imageUrl, role }) {
  return role === "assistant" ? (
    <div className="message mb-4 flex" >
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <Image
            className="w-12 h-12 rounded-full mx-auto"
            src="/resources/chatbot.png"
            alt="chat-user"
            width={48}
            height={48}
          />
          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white" />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div
          className="inline-block bg-gray-300 rounded-md p-2 px-6 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: updatedResponse,
          }}
        ></div>

        {imageUrl && (
          <div className="mt-2">
            <Image
              loader={() => imageUrl}
              src={imageUrl}
              alt={imageUrl}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="message me mb-4 flex text-right" >
      <div className="flex-1 px-2">
        <div className="inline-block bg-blue-600 rounded-md p-2 px-6 text-white">
          <span>{updatedResponse}</span>
        </div>
        <div id="response-container"></div>
      </div>
    </div>
  );
}

export default ChatBubble;
