export interface IData {
  placeholderText: string;
  labelText: string;
  inputId: string;
  inputType: string;
  inputStyles: string;
  labelStyles: string;
  inputContainerStyles: string;
}

export const data: IData[] = [
  {
    placeholderText: "Enter your message",
    labelText: "Text message",
    inputId: "botMessage",
    inputType: "text",
    inputStyles: " ",
    labelStyles: " ",
    inputContainerStyles: " ",
  },
  {
    placeholderText: "Enter variable name",
    labelText: "Bot Variables",
    inputId: "botVariables",
    inputType: "text",
    inputStyles: " ",
    labelStyles: " ",
    inputContainerStyles: " ",
  },
  {
    placeholderText: "Enter left delimiter character(s)",
    labelText: "Left Delimiter",
    inputId: "leftDelimiter",
    inputType: "text",
    inputStyles: " ",
    labelStyles: " ",
    inputContainerStyles: " ",
  },
  {
    placeholderText: "Enter right delimiter character(s)",
    labelText: "Right Delimiter",
    inputId: "rightDelimiter",
    inputType: "text",
    inputStyles: " ",
    labelStyles: " ",
    inputContainerStyles: " ",
  },
];
