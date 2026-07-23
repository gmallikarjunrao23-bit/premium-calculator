import { useState, useCallback, useEffect } from "react";
import {
  CalculatorState,
  HistoryEntry,
  performOperation,
  formatDisplay,
  validateInput,
  roundToDecimal,
  generateId,
  SCIENTIFIC_FUNCTIONS,
} from "@/lib/calculator";

const STORAGE_KEY = "calculator_memory";
const HISTORY_KEY = "calculator_history";

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    const savedMemory = localStorage.getItem(STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    return {
      display: "0",
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      memory: savedMemory ? parseFloat(savedMemory) : 0,
      history: savedHistory ? JSON.parse(savedHistory) : [],
    };
  });

  // Save memory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(state.memory));
  }, [state.memory]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history));
  }, [state.history]);

  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      let newDisplay = prev.display;

      if (prev.waitingForNewValue) {
        newDisplay = num;
      } else {
        newDisplay = prev.display === "0" ? num : prev.display + num;
      }

      if (!validateInput(newDisplay)) {
        return prev;
      }

      return {
        ...prev,
        display: newDisplay,
        waitingForNewValue: false,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      let newDisplay = prev.display;

      if (prev.waitingForNewValue) {
        newDisplay = "0.";
      } else if (!newDisplay.includes(".")) {
        newDisplay = newDisplay + ".";
      }

      return {
        ...prev,
        display: newDisplay,
        waitingForNewValue: false,
      };
    });
  }, []);

  const handleOperation = useCallback((op: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          operation: op,
          waitingForNewValue: true,
        };
      }

      if (prev.operation && !prev.waitingForNewValue) {
        try {
          const result = performOperation(
            prev.previousValue,
            currentValue,
            prev.operation
          );
          const rounded = roundToDecimal(result);

          return {
            ...prev,
            display: formatDisplay(rounded),
            previousValue: rounded,
            operation: op,
            waitingForNewValue: true,
          };
        } catch (error) {
          return {
            ...prev,
            display: "Error",
            previousValue: null,
            operation: null,
            waitingForNewValue: true,
          };
        }
      }

      return {
        ...prev,
        previousValue: currentValue,
        operation: op,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) {
        return prev;
      }

      const currentValue = parseFloat(prev.display);

      try {
        const result = performOperation(
          prev.previousValue,
          currentValue,
          prev.operation
        );
        const rounded = roundToDecimal(result);
        const expression = `${formatDisplay(prev.previousValue)} ${prev.operation} ${formatDisplay(currentValue)}`;

        const newEntry: HistoryEntry = {
          id: generateId(),
          expression,
          result: formatDisplay(rounded),
          timestamp: Date.now(),
        };

        return {
          ...prev,
          display: formatDisplay(rounded),
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
          history: [newEntry, ...prev.history].slice(0, 50),
        };
      } catch (error) {
        return {
          ...prev,
          display: "Error",
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
        };
      }
    });
  }, []);

  const handleScientific = useCallback((func: keyof typeof SCIENTIFIC_FUNCTIONS) => {
    setState((prev) => {
      try {
        const value = parseFloat(prev.display);
        const result = SCIENTIFIC_FUNCTIONS[func](value);
        const rounded = roundToDecimal(result);

        const newEntry: HistoryEntry = {
          id: generateId(),
          expression: `${func}(${formatDisplay(value)})`,
          result: formatDisplay(rounded),
          timestamp: Date.now(),
        };

        return {
          ...prev,
          display: formatDisplay(rounded),
          waitingForNewValue: true,
          history: [newEntry, ...prev.history].slice(0, 50),
        };
      } catch (error) {
        return {
          ...prev,
          display: "Error",
          waitingForNewValue: true,
        };
      }
    });
  }, []);

  const handleClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: "0",
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) return prev;

      let newDisplay = prev.display.slice(0, -1);
      if (newDisplay === "" || newDisplay === "-") {
        newDisplay = "0";
      }

      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.display);
      return {
        ...prev,
        display: formatDisplay(-value),
      };
    });
  }, []);

  const handleMemoryAdd = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.display);
      return {
        ...prev,
        memory: roundToDecimal(prev.memory + value),
      };
    });
  }, []);

  const handleMemorySubtract = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.display);
      return {
        ...prev,
        memory: roundToDecimal(prev.memory - value),
      };
    });
  }, []);

  const handleMemoryRecall = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: formatDisplay(prev.memory),
      waitingForNewValue: true,
    }));
  }, []);

  const handleMemoryClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      memory: 0,
    }));
  }, []);

  const handleClearHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: [],
    }));
  }, []);

  const handleHistorySelect = useCallback((result: string) => {
    setState((prev) => ({
      ...prev,
      display: result,
      waitingForNewValue: true,
    }));
  }, []);

  return {
    state,
    handleNumber,
    handleDecimal,
    handleOperation,
    handleEquals,
    handleScientific,
    handleClear,
    handleBackspace,
    handleToggleSign,
    handleMemoryAdd,
    handleMemorySubtract,
    handleMemoryRecall,
    handleMemoryClear,
    handleClearHistory,
    handleHistorySelect,
  };
}
