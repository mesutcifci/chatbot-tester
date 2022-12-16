import { useState, useEffect } from "react";
import { IBotData } from "../../types";

interface IChatbotPreviewProps {
  botData: IBotData;
}

const ChatbotPreview = ({
  botData: { botMessages, botVariables, leftDelimiter, rightDelimiter },
}: IChatbotPreviewProps) => {
  const [interpolatedMessages, setInterPolatedMessages] = useState<string[]>();

  useEffect(() => {
    if (leftDelimiter.trim().length > 0 && rightDelimiter.trim().length > 0) {
      interpolate();
    }
  }, [botMessages, botVariables, leftDelimiter, rightDelimiter]);

  const updateMessageWithVariable = (
    stringWithDelimiters: string,
    stringWithoutDelimiters: string,
    message: string
  ) => {
    botVariables.forEach(() => {
      const matchedObject = botVariables.find(
        (variable) => variable.name === stringWithoutDelimiters
      );

      if (matchedObject) {
        message = message.replace(stringWithDelimiters, matchedObject.value);
      } else {
        message = message.replaceAll(stringWithDelimiters, "");
      }
    });

    return message;
  };

  const returnUpdatedMessage = (message: string) => {
    let loopFlag = true;
    while (loopFlag) {
      let firstIndex = message.indexOf(leftDelimiter);
      let secondIndex = message.indexOf(
        rightDelimiter,
        firstIndex + rightDelimiter.length
      );

      // if index variables not equal -1 its mean there is some text between delimiter characters
      if (firstIndex !== -1 && secondIndex !== -1) {
        // cut the variable from message with delimiters. E.g : {firstName}
        let stringWithDelimiters = message.substring(
          firstIndex,
          secondIndex + rightDelimiter.length
        );

        // convert string from {firstName} to firstName
        let stringWithoutDelimiters = stringWithDelimiters.substring(
          leftDelimiter.length,
          stringWithDelimiters.length - rightDelimiter.length
        );

        message = updateMessageWithVariable(
          stringWithDelimiters,
          stringWithoutDelimiters,
          message
        );
      } else {
        loopFlag = false;
      }
    }
    return message;
  };

  const interpolate = () => {
    const modifiedMessages: string[] = [];
    botMessages.forEach((message) => {
      const modifiedMessage = returnUpdatedMessage(message);
      modifiedMessages.push(modifiedMessage);
    });
    setInterPolatedMessages([...modifiedMessages]);
  };

  return (
    <div className="mt-10">
      {interpolatedMessages &&
        interpolatedMessages.length > 0 &&
        interpolatedMessages.map((message, index) => (
          <p>{`Message ${index + 1}: ${message}`}</p>
        ))}
    </div>
  );
};

export default ChatbotPreview;
