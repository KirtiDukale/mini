import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "../style/Message.css";

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="bubble">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;