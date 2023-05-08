import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "data", "chat.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);

      // const response = await fetch("http://localhost:5000/chatgpt/question");
      // const chatData = await response.json();

      res
        .status(200)
        .json({ message: "Success Fetch Api", data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error hellow" });
    }
  }

  if (req.method === "POST") {
    try {
      // Code for handling POST requests goes here
      // ...
      res.status(200).json({ message: "Success POST request" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
