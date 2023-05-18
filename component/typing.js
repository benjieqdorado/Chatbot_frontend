import style from "./typing.module.css";
function Typing() {
  return (
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
      <div className={style.typing}>
        <div className={style.typing__dot}></div>
        <div className={style.typing__dot}></div>
        <div className={style.typing__dot}></div>
      </div>
    </div>
  );
}

export default Typing;
