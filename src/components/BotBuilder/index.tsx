import { useState } from "react";
import { IBotData, IBotVariable } from "../../types";

import {
  inputOuterContainerStyles,
  inputStyles,
  labelStyles,
  addButtonStyles,
  inputInnerContainerStyles,
  inputPreviewStyles,
} from "./styles";

interface IBotBuilderProps {
  botData: IBotData;
  setBotData: React.Dispatch<React.SetStateAction<IBotData>>;
}

const BotBuilder = ({ botData, setBotData }: IBotBuilderProps) => {
  const [botMessage, setBotMessage] = useState("");
  const [botVariable, setBotVariable] = useState<IBotVariable>({
    name: "",
    value: "",
  });
  const [leftDelimiter, setLeftDelimiter] = useState("");
  const [rightDelimiter, setRightDelimiter] = useState("");

  const handleAddBotData = (inputName: string) => {
    switch (inputName) {
      case "botMessage":
        setBotData((previousState) => ({
          ...previousState,
          botMessages: [...previousState.botMessages, botMessage.trim()],
        }));
        setBotMessage("");
        break;
      case "botVariable":
        if (
          botVariable?.name.trim().length > 0 &&
          botVariable?.value.trim().length > 0
        ) {
          setBotData((previousState) => ({
            ...previousState,
            botVariables: [
              ...previousState.botVariables,
              { name: botVariable.name, value: botVariable.value },
            ],
          }));
          setBotVariable({
            name: "",
            value: "",
          });
        }
        break;
      case "leftDelimiter":
        setBotData((previousState) => ({
          ...previousState,
          leftDelimiter: leftDelimiter.trim(),
        }));
        setLeftDelimiter("");
        break;
      case "rightDelimiter":
        setBotData((previousState) => ({
          ...previousState,
          rightDelimiter: rightDelimiter.trim(),
        }));
        setRightDelimiter("");
        break;
      default:
        setBotData((previousState) => previousState);
    }
  };

  const handleEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputName: string
  ) => {
    if (event.key.toLowerCase() === "enter") {
      handleAddBotData(inputName);
    }
  };

  const handleChangeBotVariableNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.currentTarget.value;

    setBotVariable((previousState) => ({
      ...previousState,
      name,
    }));
  };

  const handleChangeBotVariableValueInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setBotVariable((previousState) => ({
      ...previousState,
      value,
    }));
  };

  return (
    <div className="flex flex-col gap-y-6 w-full items-center p-5">
      {/* BOT MESSAGE INPUT */}
      <div className={`${inputOuterContainerStyles}`}>
        <label htmlFor={"botMessage"} className={`${labelStyles}`}>
          Text message
        </label>
        <div className={`${inputInnerContainerStyles}`}>
          <input
            className={`${inputStyles}`}
            name="botMessage"
            id="botMessage"
            type="text"
            placeholder="Enter your message"
            value={botMessage}
            onChange={(event) => setBotMessage(event.currentTarget.value)}
            onKeyDown={
              botMessage.trim().length > 0
                ? (event) => handleEnter(event, "botMessage")
                : undefined
            }
          />
          {botMessage.trim().length > 0 && (
            <button
              className={`${addButtonStyles}`}
              onClick={() => handleAddBotData("botMessage")}
            >
              Add
            </button>
          )}
        </div>
        {botData.botMessages.length > 0 && (
          <div>
            {botData.botMessages.map((message, index) => (
              <p key={index} className={`${inputPreviewStyles}`}>
                {message}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* BOT VARIABLE INPUT */}
      <div className={`${inputOuterContainerStyles}`}>
        <label className={`${labelStyles}`}>Bot Variable</label>

        <div className={`${inputInnerContainerStyles}`}>
          <input
            className={`${inputStyles}`}
            name="botVariableName"
            id="botVariableName"
            type="text"
            placeholder="Enter variable name"
            value={botVariable.name}
            onChange={handleChangeBotVariableNameInput}
          />
          <input
            className={`${inputStyles}`}
            name="botVariableValue"
            id="botVariableValue"
            type="text"
            placeholder="Enter variable value"
            value={botVariable.value}
            onChange={handleChangeBotVariableValueInput}
          />
          {botVariable.name.trim().length > 0 &&
            botVariable.value.trim().length > 0 && (
              <button
                className={`${addButtonStyles}`}
                onClick={() => handleAddBotData("botVariable")}
              >
                Add
              </button>
            )}
        </div>
        {botData.botVariables.length > 0 && (
          <div>
            {botData.botVariables.map((message, index) => (
              <p key={index} className={`${inputPreviewStyles}`}>
                {`${message.name}: ${message.value}`}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* LEFT DELIMITER INPUT */}
      <div className={`${inputOuterContainerStyles}`}>
        <label htmlFor={"leftDelimiter"} className={`${labelStyles}`}>
          Left Delimiter
        </label>

        <div className={`${inputInnerContainerStyles}`}>
          {" "}
          <input
            className={`${inputStyles}`}
            name="leftDelimiter"
            id="leftDelimiter"
            type="text"
            placeholder="Enter left delimiter character(s)"
            value={leftDelimiter}
            onChange={(event) => setLeftDelimiter(event.currentTarget.value)}
            onKeyDown={
              leftDelimiter.trim().length > 0
                ? (event) => handleEnter(event, "leftDelimiter")
                : undefined
            }
            {...(botData.leftDelimiter.length > 0 && { disabled: true })}
          />
          {leftDelimiter.trim().length > 0 && (
            <button
              className={`${addButtonStyles}`}
              onClick={() => handleAddBotData("leftDelimiter")}
            >
              Add
            </button>
          )}
        </div>
        {botData.leftDelimiter.trim().length > 0 && (
          <p>{botData.leftDelimiter}</p>
        )}
      </div>

      {/* RIGHT DELIMITER INPUT */}
      <div className={`${inputOuterContainerStyles}`}>
        <label htmlFor={"rightDelimiter"} className={`${labelStyles}`}>
          Right Delimiter
        </label>

        <div className={`${inputInnerContainerStyles}`}>
          {" "}
          <input
            className={`${inputStyles}`}
            name="rightDelimiter"
            id="rightDelimiter"
            type="text"
            placeholder="Enter right delimiter character(s)"
            value={rightDelimiter}
            onChange={(event) => setRightDelimiter(event.currentTarget.value)}
            onKeyDown={
              rightDelimiter.trim().length
                ? (event) => handleEnter(event, "rightDelimiter")
                : undefined
            }
            {...(botData.rightDelimiter.length > 0 && { disabled: true })}
          />
          {rightDelimiter.trim().length > 0 && (
            <button
              className={`${addButtonStyles}`}
              onClick={() => handleAddBotData("rightDelimiter")}
            >
              Add
            </button>
          )}
        </div>
        {botData.rightDelimiter.trim().length > 0 && (
          <p>{botData.rightDelimiter}</p>
        )}
      </div>
    </div>
  );
};

export default BotBuilder;
