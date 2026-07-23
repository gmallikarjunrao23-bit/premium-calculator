import { cn } from "@/lib/utils";

interface CalculatorDisplayProps {
  value: string;
  memory: number;
}

export function CalculatorDisplay({ value, memory }: CalculatorDisplayProps) {
  return (
    <div className="space-y-2 mb-6">
      {/* Memory Indicator */}
      {memory !== 0 && (
        <div className="flex items-center justify-between px-4 h-8">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            M: {memory.toFixed(2)}
          </span>
        </div>
      )}

      {/* Main Display */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-6",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "border border-slate-700/50",
          "shadow-2xl"
        )}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at center, #3B82F6 0%, transparent 70%)",
          }}
        />

        {/* Display content */}
        <div className="relative z-10 text-right">
          <div
            className={cn(
              "font-mono text-5xl font-bold tracking-tight",
              "text-white break-words",
              value.length > 12 && "text-4xl",
              value.length > 16 && "text-3xl"
            )}
          >
            {value}
          </div>

          {/* Subtle animation on value change */}
          <div className="h-1 mt-3 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent rounded-full opacity-60" />
        </div>
      </div>

      {/* Display hints */}
      <div className="text-xs text-slate-500 px-4 text-center">
        Press keyboard numbers or use buttons
      </div>
    </div>
  );
}
