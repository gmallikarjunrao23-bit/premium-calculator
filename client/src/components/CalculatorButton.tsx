import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "operation" | "equals" | "memory" | "scientific";
  className?: string;
  disabled?: boolean;
  title?: string;
}

export function CalculatorButton({
  onClick,
  children,
  variant = "default",
  className,
  disabled,
  title,
}: CalculatorButtonProps) {
  const baseStyles =
    "h-14 text-lg font-semibold rounded-xl transition-all duration-150 active:scale-95 active:shadow-inner";

  const variantStyles = {
    default: cn(
      "bg-slate-700 hover:bg-slate-600 text-white",
      "border border-slate-600 hover:border-slate-500",
      "shadow-lg hover:shadow-xl"
    ),
    operation: cn(
      "bg-blue-500 hover:bg-blue-600 text-white",
      "border border-blue-400 hover:border-blue-300",
      "shadow-lg hover:shadow-xl shadow-blue-500/50"
    ),
    equals: cn(
      "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      "text-white border border-blue-400",
      "shadow-lg hover:shadow-xl shadow-blue-500/50"
    ),
    memory: cn(
      "bg-amber-500 hover:bg-amber-600 text-white",
      "border border-amber-400 hover:border-amber-300",
      "shadow-lg hover:shadow-xl shadow-amber-500/30"
    ),
    scientific: cn(
      "bg-purple-600 hover:bg-purple-700 text-white",
      "border border-purple-500 hover:border-purple-400",
      "shadow-lg hover:shadow-xl shadow-purple-500/30"
    ),
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(baseStyles, variantStyles[variant], className)}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
