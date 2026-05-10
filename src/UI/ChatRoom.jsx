import { useState } from "react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Feel free to reach out 👋", uid: "owner", displayName: "Toriq", photoURL: null }
  ]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (name.trim()) setJoined(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: message, uid: "guest", displayName: name, photoURL: null }]);
    setMessage("");
  };

  if (!joined) {
    return (
      <div className="flex flex-col gap-4 h-full justify-center items-center py-6">
        <h3 className="font-semibold text-lg" style={{ color: '#0c1f1c' }}>Join Chat</h3>
        <form onSubmit={handleJoin} className="flex flex-col gap-3 w-full max-w-xs">
          <input
            type="text" placeholder="Your name..." value={name} onChange={e => setName(e.target.value)} required
            className="p-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.2)', color: '#0c1f1c' }}
            onFocus={(e) => { e.target.style.border = '1px solid rgba(13,148,136,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.1)'; }}
            onBlur={(e) => { e.target.style.border = '1px solid rgba(13,148,136,0.2)'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #0d9488, #22d3ee)', boxShadow: '0 4px 15px rgba(13,148,136,0.3)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(13,148,136,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(13,148,136,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Join
          </button>
        </form>
        <p className="text-xs text-center" style={{ color: '#9ca3af' }}>Demo mode — messages are local only</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <h3 className="font-semibold" style={{ color: '#0c1f1c' }}>
        Live Chat <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>· demo mode</span>
      </h3>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 min-h-50 max-h-75 pr-1">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 items-start ${msg.uid === "guest" ? "flex-row-reverse" : ""}`}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white shrink-0" style={{ background: 'linear-gradient(135deg, #0d9488, #22d3ee)' }}>
              {(msg.displayName || "?")[0].toUpperCase()}
            </div>
            <div
              className="rounded-xl px-3 py-2 text-sm max-w-[75%]"
              style={msg.uid === "guest"
                ? { background: 'linear-gradient(135deg, #0d9488, #22d3ee)', color: '#fff' }
                : { background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.15)', color: '#374151' }
              }
            >
              <p className="text-xs opacity-60 mb-0.5">{msg.displayName}</p>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..."
          className="flex-1 p-2.5 rounded-xl text-sm outline-none transition-all duration-200"
          style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)', color: '#0c1f1c' }}
          onFocus={(e) => { e.target.style.border = '1px solid rgba(13,148,136,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.08)'; }}
          onBlur={(e) => { e.target.style.border = '1px solid rgba(13,148,136,0.15)'; e.target.style.boxShadow = 'none'; }}
        />
        <button
          type="submit"
          className="px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #0d9488, #22d3ee)', boxShadow: '0 2px 10px rgba(13,148,136,0.25)' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(13,148,136,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(13,148,136,0.25)'; }}
        >
          Send
        </button>
      </form>
    </div>
  );
}