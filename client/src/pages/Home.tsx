import { useEffect, useState } from "react";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorDisplay } from "@/components/CalculatorDisplay";
import { CalculatorButton } from "@/components/CalculatorButton";
import { CalculatorHistory } from "@/components/CalculatorHistory";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showHistory, setShowHistory] = useState(false);
  const [showScientific, setShowScientific] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
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
  } = useCalculator();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key >= "0" && key <= "9") {
        e.preventDefault();
        handleNumber(key);
      } else if (key === ".") {
        e.preventDefault();
        handleDecimal();
      } else if (key === "+") {
        e.preventDefault();
        handleOperation("+");
      } else if (key === "-") {
        e.preventDefault();
        handleOperation("-");
      } else if (key === "*") {
        e.preventDefault();
        handleOperation("×");
      } else if (key === "/") {
        e.preventDefault();
        handleOperation("÷");
      } else if (key === "^") {
        e.preventDefault();
        handleOperation("^");
      } else if (key === "%") {
        e.preventDefault();
        handleOperation("%");
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (key === "Escape") {
        e.preventDefault();
        handleClear();
      } else if (key.toLowerCase() === "m") {
        e.preventDefault();
        handleMemoryRecall();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleNumber,
    handleDecimal,
    handleOperation,
    handleEquals,
    handleBackspace,
    handleClear,
    handleMemoryRecall,
  ]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        "dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
        "light:from-slate-50 light:via-white light:to-slate-100"
      )}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 dark:border-slate-700/50 light:border-slate-200/50 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/80 backdrop-blur-xl">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              ∑
            </div>
            <h1 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
              Premium Calculator
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
                title="Toggle history"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Display */}
            <CalculatorDisplay value={state.display} memory={state.memory} />

            {/* Basic Operations */}
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                <CalculatorButton
                  onClick={handleClear}
                  variant="default"
                  className="col-span-2"
                >
                  Clear
                </CalculatorButton>
                <CalculatorButton onClick={handleBackspace} variant="default">
                  ← Del
                </CalculatorButton>
                <CalculatorButton
                  onClick={() => handleOperation("÷")}
                  variant="operation"
                >
                  ÷
                </CalculatorButton>
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-4 gap-2">
                {[7, 8, 9].map((num) => (
                  <CalculatorButton
                    key={num}
                    onClick={() => handleNumber(String(num))}
                    variant="default"
                  >
                    {num}
                  </CalculatorButton>
                ))}
                <CalculatorButton
                  onClick={() => handleOperation("×")}
                  variant="operation"
                >
                  ×
                </CalculatorButton>

                {[4, 5, 6].map((num) => (
                  <CalculatorButton
                    key={num}
                    onClick={() => handleNumber(String(num))}
                    variant="default"
                  >
                    {num}
                  </CalculatorButton>
                ))}
                <CalculatorButton
                  onClick={() => handleOperation("-")}
                  variant="operation"
                >
                  −
                </CalculatorButton>

                {[1, 2, 3].map((num) => (
                  <CalculatorButton
                    key={num}
                    onClick={() => handleNumber(String(num))}
                    variant="default"
                  >
                    {num}
                  </CalculatorButton>
                ))}
                <CalculatorButton
                  onClick={() => handleOperation("+")}
                  variant="operation"
                >
                  +
                </CalculatorButton>

                <CalculatorButton
                  onClick={() => handleNumber("0")}
                  className="col-span-2"
                  variant="default"
                >
                  0
                </CalculatorButton>
                <CalculatorButton onClick={handleDecimal} variant="default">
                  .
                </CalculatorButton>
                <CalculatorButton
                  onClick={handleEquals}
                  variant="equals"
                  className="font-bold"
                >
                  =
                </CalculatorButton>
              </div>
            </div>

            {/* Scientific & Memory Functions */}
            <div className="space-y-3">
              {/* Toggle Scientific */}
              <Button
                onClick={() => setShowScientific(!showScientific)}
                variant="outline"
                className="w-full border-slate-600 hover:bg-slate-800"
              >
                {showScientific ? "Hide" : "Show"} Scientific Functions
              </Button>

              {/* Scientific Functions */}
              {showScientific && (
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "sin", func: "sin" },
                    { label: "cos", func: "cos" },
                    { label: "tan", func: "tan" },
                    { label: "√", func: "sqrt" },
                    { label: "log", func: "log" },
                    { label: "ln", func: "ln" },
                    { label: "x²", func: "cbrt" },
                    { label: "x!", func: "factorial" },
                    { label: "1/x", func: "reciprocal" },
                    { label: "+/-", func: "negate" },
                    { label: "%", func: "percent" },
                    { label: "^", func: "pow" },
                  ].map(({ label, func }) => (
                    <CalculatorButton
                      key={func}
                      onClick={() =>
                        handleScientific(func as any)
                      }
                      variant="scientific"
                      title={`${label} function`}
                    >
                      {label}
                    </CalculatorButton>
                  ))}
                </div>
              )}

              {/* Memory Functions */}
              <div className="grid grid-cols-4 gap-2">
                <CalculatorButton
                  onClick={handleMemoryAdd}
                  variant="memory"
                  title="Add to memory (M+)"
                >
                  M+
                </CalculatorButton>
                <CalculatorButton
                  onClick={handleMemorySubtract}
                  variant="memory"
                  title="Subtract from memory (M-)"
                >
                  M−
                </CalculatorButton>
                <CalculatorButton
                  onClick={handleMemoryRecall}
                  variant="memory"
                  title="Recall memory (MR)"
                >
                  MR
                </CalculatorButton>
                <CalculatorButton
                  onClick={handleMemoryClear}
                  variant="memory"
                  title="Clear memory (MC)"
                >
                  MC
                </CalculatorButton>
              </div>
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            {isMobile ? (
              showHistory && (
                <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">History</h3>
                    <Button
                      onClick={() => setShowHistory(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex-1 bg-slate-900 rounded-lg p-4 overflow-y-auto">
                    <CalculatorHistory
                      history={state.history}
                      onSelect={(result) => {
                        handleHistorySelect(result);
                        setShowHistory(false);
                      }}
                      onClear={handleClearHistory}
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="sticky top-20">
                <CalculatorHistory
                  history={state.history}
                  onSelect={handleHistorySelect}
                  onClear={handleClearHistory}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12 py-6 text-center text-sm text-slate-500">
        <p>Premium Calculator • Keyboard support: Numbers, +−×÷, Enter to calculate, Backspace to delete</p>
      </footer>
    </div>
  );
}
