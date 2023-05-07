import Head from "next/head";

import Chat from "../component/chat";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatbot</title>
        <meta name="description" content="Chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="w-full h-screen">
        <div className="flex h-full">
          <div className="flex-1 bg-gray-100 w-full h-full">
            <div className="main-body container m-auto w-4/12 h-full flex flex-col">
              <div className="py-4 flex-2 flex flex-row">
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
