import { useState } from "react";
import { useEffect } from "react";
import { IBotData } from "../../types";

interface IChatbotPreviewProps {
  botData: IBotData;
}

const ChatbotPreview = ({ botData }: IChatbotPreviewProps) => {
  const [interpolatedMessages, setInterPolatedMessages] = useState();

  return <div></div>;
};

export default ChatbotPreview;
