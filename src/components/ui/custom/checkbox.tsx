"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Circle, Minus } from "lucide-react"

import type { CheckBoxType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checkBoxType?: CheckBoxType | null
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ checkBoxType = "square", className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 border border-muted-foreground/50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      checkBoxType === "circle"
        ? "rounded-full data-[state=checked]:border-border data-[state=checked]:bg-transparent data-[state=checked]:text-primary-foreground"
        : "rounded-sm data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current [&>:first-child]:data-[state=indeterminate]:hidden [&>:last-child]:data-[state=checked]:hidden">
      {checkBoxType === "circle" ? (
        <Circle className="size-4 fill-primary stroke-primary" />
      ) : (
        <Check strokeWidth={3} className="size-3" />
      )}
      <Minus strokeWidth={3} className="size-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
