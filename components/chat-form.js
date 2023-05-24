import { useRef } from "react";

function ChatForm({ fetchChatData, setChat, setTyping, setError }) {
  const customerInput = useRef();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredCustomerInput = customerInput.current.value;
    setChat((prevChat) => [
      ...prevChat,
      { role: "user", message: enteredCustomerInput },
    ]);
    setTyping(true);
    const question = {
      question: enteredCustomerInput,
    };

    customerInput.current.value = "";
    try {
      const response = await fetch("http://localhost:8000/chatgpt/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      if (!response.ok) {
        setError(true);
        setTyping(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      fetchChatData();
      setTyping(false);
    } catch (error) {
      setTyping(false);
      setError(true);
      console.error("An error occurred:", error);
    }
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div className="flex-2 pt-4 pb-10">
        <div className="write bg-white shadow flex rounded-lg">
          <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
            <span className="block text-center text-gray-400 hover:text-gray-800">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>

          <div className="flex-1">
            <textarea
              name="message"
              className="w-full block outline-none py-4 px-4 bg-transparent"
              rows={1}
              placeholder="Type a message..."
              autoFocus
              defaultValue={""}
              ref={customerInput}
            />
          </div>
          <div className="flex-2 w-32 p-2 flex content-center items-center">
            <div className="flex-1 text-center">
              <span className="text-gray-400 hover:text-gray-800">
                <span className="inline-block align-text-bottom">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </span>
              </span>
            </div>
            <div className="flex-1">
              <button className="w-10 h-10 inline-block" type="submit">
                <span className="inline-block align-text-bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChatForm;
