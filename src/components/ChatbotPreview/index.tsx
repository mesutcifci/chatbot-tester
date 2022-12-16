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
    if (botVariables.length > 0) {
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
    } else {
      message = message.replaceAll(stringWithDelimiters, "");
    }

    return message;
  };

  const returnUpdatedMessage = (message: string) => {
    let loopFlag = true;
    let counter = 1;
    while (loopFlag) {
      let firstIndex = message.indexOf(leftDelimiter);
      counter++;
      /**
       * The second parameter of indexOf method specify which position start from
       * Hi @@firstname@@ @@lastname@@, how are you today? => in this message we want to find
       * index of the first and the last characters of this string @@firstname@@
       * so in that case firstIndex should be 3
       * on the other hand because we want to pass right delimiter characters
       * we should start to search index of character "f", which is 5
       * formula: start position = 3(firstIndex) + 2(rightDelimiter.length);
       */
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
          <p key={index}>{`Message ${index + 1}: ${message}`}</p>
        ))}
    </div>
  );
};

export default ChatbotPreview;
