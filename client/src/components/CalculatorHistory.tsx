import { HistoryEntry } from "@/lib/calculator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorHistoryProps {
  history: HistoryEntry[];
  onSelect: (result: string) => void;
  onClear: () => void;
}

export function CalculatorHistory({
  history,
  onSelect,
  onClear,
}: CalculatorHistoryProps) {
  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          History
        </h3>
        {history.length > 0 && (
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-slate-400 hover:text-red-400"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-64 rounded-lg border border-slate-700/50 bg-slate-800/50">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            No calculations yet
          </div>
        ) : (
          <div className="space-y-1 p-3">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelect(entry.result)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all duration-200",
                  "hover:bg-slate-700/50 active:bg-slate-600/50",
                  "border border-transparent hover:border-blue-500/30",
                  "group"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 truncate">
                      {entry.expression}
                    </div>
                    <div className="text-sm font-semibold text-blue-400 mt-1">
                      = {entry.result}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleCopy(entry.result, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 hover:bg-slate-600 rounded"
                    title="Copy result"
                  >
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
