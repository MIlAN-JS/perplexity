import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import useChat from "../../hooks/useChat";
// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  computer: "M2 3h20v14H2zM8 21h8M12 17v4",
  plus: "M12 5v14M5 12h14",
  history: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  discover: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  spaces: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  finance: "M3 17l4-8 4 4 4-6 4 5",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  chevronUp: "M18 15l-6-6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  copy: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4a2 2 0 0 1 2-2h4a2 2 0 1 1 0 4H10a2 2 0 0 1-2-2z",
  thumbUp: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
  thumbDown: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17",
  mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8h.01M11 12h1v4h1",
  sparkle: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
};

const initialMessages = [
 
];

const NAV_ITEMS = [
  { icon: "search", label: "Search" },
  { icon: "computer", label: "Computer", active: true },
];

const NAV_SECONDARY = [
  { icon: "plus", label: "New thread", isAction: true },
  { icon: "history", label: "History" },
  { icon: "discover", label: "Discover" },
  { icon: "spaces", label: "Spaces" },
  { icon: "finance", label: "Finance" },
  { icon: "more", label: "More" },
];



// ── Message Action Bar ────────────────────────────────────────────────────
function MessageActions({ msgId, liked, disliked, onLike, onDislike }) {
  return (
    <div className="flex items-center justify-between mt-3 pt-1">
      <div className="flex items-center gap-1">
        {[
          { icon: "share", title: "Share" },
          { icon: "download", title: "Download" },
          { icon: "copy", title: "Copy" },
        ].map(({ icon, title }) => (
          <button key={icon} title={title}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: "#666" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.background = "#2a2a2a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.background = "transparent"; }}
          >
            <Icon d={Icons[icon]} size={14} />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onLike(msgId)}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: liked ? "#C6613F" : "#666" }}
          onMouseEnter={e => { if (!liked) { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.background = "#2a2a2a"; }}}
          onMouseLeave={e => { if (!liked) { e.currentTarget.style.color = "#666"; e.currentTarget.style.background = "transparent"; }}}
        >
          <Icon d={Icons.thumbUp} size={14} strokeWidth={liked ? 2.5 : 1.8} />
        </button>
        <button onClick={() => onDislike(msgId)}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: disliked ? "#C6613F" : "#666" }}
          onMouseEnter={e => { if (!disliked) { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.background = "#2a2a2a"; }}}
          onMouseLeave={e => { if (!disliked) { e.currentTarget.style.color = "#666"; e.currentTarget.style.background = "transparent"; }}}
        >
          <Icon d={Icons.thumbDown} size={14} strokeWidth={disliked ? 2.5 : 1.8} />
        </button>
        <button
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "#666" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.background = "#2a2a2a"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.background = "transparent"; }}
        >
          <Icon d={Icons.more} size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Typing dots ───────────────────────────────────────────────────────────
function TypingDots() {



  return (
    <div className="flex items-center gap-1.5 py-2">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#666", animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </div>
  );
}



// ── Main Chat Page ────────────────────────────────────────────────────────
export default function ChatPage() {


  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [reactions, setReactions] = useState({});
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [model, setModel] = useState("Model");
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  let chatId = null
  const {handleSendMessage} = useChat()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const messageSubmitHandler = async(e)=>{
    console.log(e)
    e.preventDefault();
    await handleSendMessage({humanMessage : input , chatId})
    
}

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {  messageSubmitHandler(e); }
  };

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const toggleLike = id => setReactions(r => ({ ...r, [id]: { ...r[id], liked: !r[id]?.liked, disliked: false } }));
  const toggleDislike = id => setReactions(r => ({ ...r, [id]: { ...r[id], disliked: !r[id]?.disliked, liked: false } }));

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#141414", color: "#e0e0e0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        textarea { resize: none; outline: none; }
        textarea::placeholder { color: #555; }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-enter { animation: fadeUp 0.25s ease forwards; }
        .icon-btn { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* Sidebar */}
      <Sidebar  NAV_SECONDARY = {NAV_SECONDARY} navItems={NAV_ITEMS} Icon = {Icon} Icons = {Icons} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid #242424" }}>

          {/* Tabs */}
          <div className="flex items-center gap-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm relative"
              style={{ color: "#e0e0e0" }}>
              {/* Sparkle icon like perplexity */}
              <Icon d={Icons.sparkle} size={15} style={{ color: "#C6613F" }} />
              <span className="font-medium">Answer</span>
              {/* active underline */}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#C6613F" }} />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* ••• menu */}
            <button className="p-1.5 rounded-md icon-btn"
              style={{ color: "#666" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#242424"; e.currentTarget.style.color = "#aaa"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; }}>
              <Icon d={Icons.more} size={16} />
            </button>

            {/* Share */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={{ background: "#242424", color: "#ccc", border: "1px solid #333" }}
              onMouseEnter={e => e.currentTarget.style.background = "#2d2d2d"}
              onMouseLeave={e => e.currentTarget.style.background = "#242424"}>
              <Icon d={Icons.share} size={13} />
              <span>Share</span>
            </button>

            {/* Download Comet */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#C6613F", color: "#fff" }}
              onMouseEnter={e => e.currentTarget.style.background = "#b3552e"}
              onMouseLeave={e => e.currentTarget.style.background = "#C6613F"}>
              <Icon d={Icons.download} size={13} />
              <span>Download Comet</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} onScroll={handleScroll}
          className="flex-1 overflow-y-auto relative"
          style={{ scrollBehavior: "smooth" }}>
          <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
            {messages.map((msg, idx) => (
              <div key={msg.id} className={`msg-enter`}>
                {msg.role === "user" ? (
                  /* User message — right-aligned plain text */
                  <div className="flex justify-end">
                    <div className="max-w-sm px-4 py-2.5 rounded-2xl text-sm"
                      style={{ background: "#2a2a2a", color: "#e0e0e0", borderBottomRightRadius: 6 }}>
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  /* AI message — left, larger text, action bar below */
                  <div>
                    <p className="text-lg leading-relaxed font-light" style={{ color: "#e8e8e8" }}>
                      {msg.content}
                    </p>
                    <MessageActions
                      msgId={msg.id}
                      liked={reactions[msg.id]?.liked}
                      disliked={reactions[msg.id]?.disliked}
                      onLike={toggleLike}
                      onDislike={toggleDislike}
                    />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="msg-enter">
                <TypingDots />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Scroll to bottom btn */}
          {showScrollBtn && (
            <button
              onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#2d2d2d", border: "1px solid #3a3a3a", color: "#aaa" }}>
              <Icon d="M12 5v14M5 12l7 7 7-7" size={14} />
            </button>
          )}
        </div>

        {/* Bottom input area */}
        <div className="flex-shrink-0 px-6 pb-5 pt-2">
          <div className="max-w-2xl mx-auto">

            {/* Info bar */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <Icon d={Icons.info} size={13} style={{ color: "#555", flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#555" }}>
                Viewing a shared thread. Your follow-ups will be private to you.
              </span>
            </div>

            {/* Input box */}
            <form
            onSubmit={(e)=>{
                messageSubmitHandler(e)
            }}
             className="rounded-2xl px-4 pt-3 pb-2"
              style={{ background: "#1e1e1e", border: "1px solid #2e2e2e" }}>
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => { setInput(e.target.value); adjustHeight(); }}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow-up"
                className="w-full bg-transparent text-sm leading-relaxed"
                style={{ color: "#e0e0e0", minHeight: 24, maxHeight: 140, fontFamily: "inherit" }}
              />

              {/* Toolbar row */}
              <div className="flex items-center justify-between mt-2">
                {/* Left: attach */}
                <button className="flex items-center justify-center w-7 h-7 rounded-lg icon-btn transition-colors"
                  style={{ background: "#2a2a2a", color: "#777" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#333"; e.currentTarget.style.color = "#aaa"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.color = "#777"; }}>
                  <Icon d={Icons.plus} size={14} />
                </button>

                {/* Right: model selector + mic + send */}
                <div className="flex items-center gap-2">
                  {/* Model dropdown */}
                  <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors"
                    style={{ background: "#2a2a2a", color: "#888", border: "1px solid #333" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#333"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2a2a2a"}
                    onClick={() => setModel(model === "Model" ? "Sonnet 4.6" : "Model")}>
                    <span>{model}</span>
                    <Icon d={Icons.chevronDown} size={11} />
                  </button>

                  {/* Mic */}
                  <button className="flex items-center justify-center w-7 h-7 rounded-lg icon-btn transition-colors"
                    style={{ color: "#666" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.color = "#aaa"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; }}>
                    <Icon d={Icons.mic} size={14} />
                  </button>

                  {/* Send */}
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
                    style={{
                      background: input.trim() && !loading ? "#C6613F" : "#2a2a2a",
                      color: input.trim() && !loading ? "#fff" : "#555",
                      cursor: input.trim() && !loading ? "pointer" : "default",
                    }}>
                    <Icon d={Icons.send} size={13} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}