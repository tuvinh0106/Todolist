import { useContext } from "react"
import { evolu } from "@/services/evolu/client"
import {
  ArrowUpRightIcon,
  MenuIcon,
  PaletteIcon,
  StickyNoteIcon,
  TrashIcon,
  WrenchIcon,
} from "lucide-react"

import { appVersion, iconSize } from "@/lib/constants"
import { TodolistContext } from "@/lib/providers/todolist"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import AppHeader from "@/components/app-header"
import AppLogo from "@/components/app-logo"
import AppearanceMenu from "@/components/menu/appearance-menu"

import AdvancedMenu from "./menu/advanced-menu"
import { TodoListContent, TodoListModal, TodoListTrigger } from "./ui/custom/modal"

const Menu = () => {
  const { settings } = useContext(TodolistContext)
  const handleResetOwnerClick = () => {
    if (confirm("Are you sure? It will delete all your local data.")) {
      evolu.resetOwner()
    }
  }

  return (
    <div className="flex w-full items-center justify-between px-5">
      <AppHeader />

      <TodoListModal>
        <TodoListTrigger asChild>
          <Button size="icon" className="rounded-lg">
            <MenuIcon size={iconSize} />
          </Button>
        </TodoListTrigger>
        <TodoListContent className="h-[505px] bg-secondary px-4 sm:rounded-3xl">
          <ScrollArea className="rounded-3xl py-3">
            <div className="flex flex-col items-center space-y-6 px-4 py-2">
              <div className="flex w-full items-center justify-start gap-4 rounded-3xl bg-background p-3 font-medium">
                <div className="grid size-20 place-items-center text-clip rounded-full border-2">
                  <AppLogo />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground">
                    Version {appVersion.toFixed(1)}
                  </p>
                </div>
                <div className="ml-auto">
                  <Button
                    className="flex items-center justify-center gap-1 text-muted-foreground"
                    variant="link"
                  >
                    Source code
                    <ArrowUpRightIcon size={iconSize} />
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-col space-y-2">
                <p className="self-start text-lg font-bold">Appearance</p>
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col items-center space-y-2 rounded-3xl bg-background p-3 font-medium text-foreground/80"
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <PaletteIcon size={18} />
                        <p>Color Theme</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <AppearanceMenu settings={settings} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <WrenchIcon size={18} />
                        <p>Advanced</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <AdvancedMenu settings={settings} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Button
                onClick={handleResetOwnerClick}
                className="flex w-full items-center justify-center space-x-3 rounded-2xl px-6 py-4 font-medium transition-colors"
              >
                <TrashIcon size={iconSize} />
                <p>Delete data</p>
              </Button>
            </div>
          </ScrollArea>
        </TodoListContent>
      </TodoListModal>
    </div>
  )
}

export default Menu
