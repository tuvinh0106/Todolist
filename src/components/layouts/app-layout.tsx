// components/layouts/RootLayout.tsx

import { type ReactNode, Suspense } from "react"
import { evolu } from "@/services/evolu/client"
import { EvoluProvider } from "@evolu/react"

import TodolistProvider from "@/lib/providers/todolist"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import Loading from "@/components/loading"
import { ThemeProvider } from "@/components/theme-provider"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <EvoluProvider value={evolu}>
          <TodolistProvider>
            <div className={cn("font-sans antialiased")}>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </TodolistProvider>
        </EvoluProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
