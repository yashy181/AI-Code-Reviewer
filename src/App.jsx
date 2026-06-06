import { useState } from "react";
import axios from "axios";

function App() {

  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const reviewCode = async () => {

    if (!code) {
      alert("Please paste code");
      return;
    }

    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    try {

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `
              Review this code.

              Give:
              1. Code Quality
              2. Bugs
              3. Optimization Suggestions
              4. Best Practices
              5. Improved Version

              Code:
              ${code}
              `,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.choices[0].message.content;

      setReview(result);

    } catch (error) {

      console.log(error);

      setReview(
        "Error: " +
        (error.response?.data?.error?.message || error.message)
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #000000, #111827)",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >

      <h1
        style={{
          fontSize: "55px",
          color: "#22c55e",
        }}
      >
        AI Code Reviewer
      </h1>

      <p
        style={{
          color: "#d1d5db",
          fontSize: "20px",
          marginBottom: "30px",
        }}
      >
        Analyze and improve code using AI
      </p>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "80%",
          height: "250px",
          padding: "20px",
          borderRadius: "15px",
          border: "none",
          fontSize: "16px",
          outline: "none",
          background: "#1f2937",
          color: "white",
        }}
      />

      <br />

      <button
        onClick={reviewCode}
        style={{
          marginTop: "20px",
          padding: "15px 35px",
          background: "#22c55e",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      <div
        style={{
          marginTop: "40px",
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
          width: "80%",
          marginInline: "auto",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          fontSize: "17px",
        }}
      >
        {review}
      </div>

    </div>
  );
}

export default App;