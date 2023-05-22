import Head from "next/head";

import Chat from "../component/chat";
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatbot</title>
        <meta name="description" content="Chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Script src="https://cdn.tailwindcss.com"></Script>
      </Head>
      <div className="w-full h-screen">
        <div className="flex h-full">
          <div className="flex-1 bg-white w-full h-full">
            <div className="main-body container m-auto w-11/12 h-full flex flex-col">
              <div className="py-4 flex-2 flex flex justify-center">
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
