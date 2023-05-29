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
      const reader = response.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value); 
        res.write(`${chunk}`);
      }
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
