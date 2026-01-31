export enum Operation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT'
}

export interface HistoryItem {
  id: string;
  num1: number;
  num2: number;
  operation: Operation;
  result: number;
  timestamp: number;
}

export interface MathExplanation {
  text: string;
  funFact?: string;
}
