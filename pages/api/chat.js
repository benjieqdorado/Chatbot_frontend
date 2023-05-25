export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://127.0.0.1:8000/chatgpt/question");
      const data = await response.json();
      
      res.status(200).json({ data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const response = await fetch("http://127.0.0.1:8000/chatgpt/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify(req.query),
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
