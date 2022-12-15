import { useEffect, useState } from "react";
import { BotBuilder, ChatbotPreview } from "./components";
import { IBotData } from "./types";

const initialState: IBotData = {
  botMessages: [],
  botVariables: [],
  leftDelimiter: "",
  rightDelimiter: "",
};

function App() {
  const [botData, setBotData] = useState(initialState);

  return (
    <div className="App flex flex-col justify-center items-center min-w-[320px]">
      <ChatbotPreview botData={botData} />
      <BotBuilder botData={botData} setBotData={setBotData} />
    </div>
  );
}

export default App;
