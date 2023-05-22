import Image from "next/image";
function Error() {
  return (
    <div className="message mb-4 flex">
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <Image
            className="w-12 h-12 rounded-full mx-auto"
            src="./resources/chatbot.png"
            alt="chat-user"
          />
          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white" />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block bg-gray-300 rounded-md p-2 px-6 text-gray-700">
          We apologize, but we encountered an issue while processing your
          request. To learn more about this problem or if you have any
          questions, please visit our website at <a href="https://www.pbdionisio.com/" target="__blank" className="text-blue-400 underline">https://www.pbdionisio.com/</a> .
          Please try again later or contact us for further assistance
        </div>
      </div>
    </div>
  );
}

export default Error;
