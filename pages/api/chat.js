export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://157.230.16.36:8000/chatgpt/question");
      const data = await response.json();

      res.status(200).json({ data: data });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
