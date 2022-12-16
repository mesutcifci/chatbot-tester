import { screen, render, getByText } from "@testing-library/react";
import ChatbotPreview from "..";
import { IBotData } from "../../../types";

describe("ChatbotPreview", () => {
  it("should interpolate a variable from the session object", () => {
    const botData: IBotData = {
      botMessages: ["Hi {firstname}, how are you today?"],
      botVariables: [{ name: "firstname", value: "John" }],
      leftDelimiter: "{",
      rightDelimiter: "}",
    };
    render(<ChatbotPreview botData={botData} />);
    const expected = "Message 1: Hi John, how are you today?";
    const resultElement = screen.getByText(expected);
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toEqual(expected);
  });

  it("should interpolate multiple variables from the session object", () => {
    const botData: IBotData = {
      botMessages: ["Hi @@firstname@@ @@lastname@@, how are you today?"],
      botVariables: [
        { name: "firstname", value: "John" },
        { name: "lastname", value: "Doe" },
      ],
      leftDelimiter: "@@",
      rightDelimiter: "@@",
    };
    render(<ChatbotPreview botData={botData} />);

    const expected = "Message 1: Hi John Doe, how are you today?";
    const resultElement = screen.getByText(expected);
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toEqual(expected);
  });

  it("should replace a non-existant variable with an empty string", () => {
    const botData: IBotData = {
      botMessages: ["Hi {firstname}, how are you today?"],
      botVariables: [],
      leftDelimiter: "{",
      rightDelimiter: "}",
    };
    render(<ChatbotPreview botData={botData} />);

    const expected = "Message 1: Hi , how are you today?";
    const resultElement = screen.getByText(expected);
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toEqual(expected);
  });

  it("should ignore an open delimiter without a closing delimiter", () => {
    const botData: IBotData = {
      botMessages: ["Hi {firstname, how are you today?"],
      botVariables: [{ name: "firstname", value: "John" }],
      leftDelimiter: "{",
      rightDelimiter: "}",
    };
    render(<ChatbotPreview botData={botData} />);
    const expected = "Message 1: Hi {firstname, how are you today?";
    const resultElement = screen.getByText(expected);
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toEqual(expected);
  });
});
