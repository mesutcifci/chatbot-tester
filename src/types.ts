export interface IBotVariable {
  name: string;
  value: string;
}

export interface IBotData {
  botMessages: string[];
  botVariables: IBotVariable[];
  leftDelimiter: string;
  rightDelimiter: string;
}
