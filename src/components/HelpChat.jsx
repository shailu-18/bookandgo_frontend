import { useState } from "react";

export default function HelpChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", bot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, bot: false };

    let botReply = "Sorry, I didn't understand.";

    // ✅ FAQ responses
    if (input.toLowerCase().includes("price")) {
      botReply = "Prices depend on the trip. Please check the details page.";
    } else if (input.toLowerCase().includes("booking")) {
      botReply = "Go to booking page and fill your details.";
    } else if (input.toLowerCase().includes("cancel")) {
      botReply = "You can cancel from My Bookings page.";
    } else if (input.toLowerCase().includes("wishlist")) {
      botReply = "Click ❤️ Save for Later to add trips to wishlist.";
    } else if (input.toLowerCase().includes("hi")) {
      botReply = "Hello!";
    } else if (input.toLowerCase().includes("good morning")) {
      botReply = "Very Good morning";
    }

    // ✅ correct state update
    setMessages((prev) => [
      ...prev,
      userMsg,
      { text: botReply, bot: true }
    ]);

    setInput("");
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button className="chat-btn" onClick={() => setOpen(!open)}>
        💬 Help
      </button>

      {/* 💬 Chat Box */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">Help Center</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <p key={i} className={msg.bot ? "bot" : "user"}>
                {msg.text}
              </p>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}