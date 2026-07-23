/**
 * Calculator Core Logic
 * Handles all mathematical operations and state management
 */

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  memory: number;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export const SCIENTIFIC_FUNCTIONS = {
  sin: (x: number) => Math.sin((x * Math.PI) / 180),
  cos: (x: number) => Math.cos((x * Math.PI) / 180),
  tan: (x: number) => Math.tan((x * Math.PI) / 180),
  asin: (x: number) => (Math.asin(x) * 180) / Math.PI,
  acos: (x: number) => (Math.acos(x) * 180) / Math.PI,
  atan: (x: number) => (Math.atan(x) * 180) / Math.PI,
  log: (x: number) => Math.log10(x),
  ln: (x: number) => Math.log(x),
  sqrt: (x: number) => Math.sqrt(x),
  cbrt: (x: number) => Math.cbrt(x),
  factorial: (x: number) => {
    if (x < 0) throw new Error("Factorial of negative number");
    if (x === 0 || x === 1) return 1;
    let result = 1;
    for (let i = 2; i <= x; i++) {
      result *= i;
    }
    return result;
  },
  reciprocal: (x: number) => 1 / x,
  percent: (x: number) => x / 100,
  negate: (x: number) => -x,
};

export function performOperation(
  prev: number,
  current: number,
  operation: string
): number {
  switch (operation) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "×":
      return prev * current;
    case "÷":
      if (current === 0) throw new Error("Division by zero");
      return prev / current;
    case "^":
      return Math.pow(prev, current);
    case "%":
      return prev % current;
    default:
      return current;
  }
}

export function formatDisplay(value: string | number): string {
  const str = String(value);
  
  // Handle very large or very small numbers with scientific notation
  const num = parseFloat(str);
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Limit decimal places for display
  if (str.includes(".")) {
    const parts = str.split(".");
    if (parts[1].length > 10) {
      return parseFloat(str).toFixed(10);
    }
  }
  
  return str;
}

export function validateInput(input: string): boolean {
  // Check for valid number format
  if (input === "") return true;
  if (input === ".") return true;
  if (input === "-") return true;
  
  // Prevent multiple decimal points
  if (input.includes(".") && input.split(".").length > 2) {
    return false;
  }
  
  // Prevent multiple negative signs
  if (input.split("-").length > 2) {
    return false;
  }
  
  return !isNaN(parseFloat(input));
}

export function roundToDecimal(value: number, decimals: number = 10): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
