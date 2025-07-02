import type * as React from "react"
import { cn } from "@/lib/utils"

interface ColoredProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  colorScheme?: "default" | "success" | "warning" | "danger"
  showValue?: boolean
  size?: "sm" | "md" | "lg"
}

export function ColoredProgress({
  value,
  max = 100,
  colorScheme = "default",
  showValue = false,
  size = "md",
  className,
  ...props
}: ColoredProgressProps) {
  const percentage = (value / max) * 100

  // Determinar a cor baseada no valor e no esquema de cores
  const getColor = () => {
    if (colorScheme === "default") {
      // Determinar cor baseada no valor
      if (percentage >= 75) return "bg-green-500"
      if (percentage >= 50) return "bg-amber-500"
      if (percentage >= 25) return "bg-orange-500"
      return "bg-red-500"
    }

    if (colorScheme === "success") return "bg-green-500"
    if (colorScheme === "warning") return "bg-amber-500"
    if (colorScheme === "danger") return "bg-red-500"

    return "bg-blue-500"
  }

  // Determinar altura baseada no tamanho
  const getHeight = () => {
    if (size === "sm") return "h-1.5"
    if (size === "lg") return "h-3"
    return "h-2"
  }

  return (
    <div className="relative w-full">
      <div className={cn("w-full overflow-hidden rounded-full bg-slate-200", getHeight(), className)} {...props}>
        <div className={cn("h-full transition-all", getColor())} style={{ width: `${percentage}%` }} />
      </div>
      {showValue && <span className="absolute right-0 -top-5 text-xs font-medium">{percentage.toFixed(0)}%</span>}
    </div>
  )
}
