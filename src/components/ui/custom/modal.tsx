"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootTodoListProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface TodoListProps extends BaseProps {
  className?: string
  asChild?: true
}

const desktop = "(min-width: 768px)"

const ModalContext = React.createContext<
  | {
      isDesktop: boolean
      open: boolean
      setOpen: React.Dispatch<React.SetStateAction<boolean>>
      // eslint-disable-next-line no-mixed-spaces-and-tabs
    }
  | undefined
>(undefined)

const TodoListModal = ({
  children,
  open = false,
  onOpenChange,
}: RootTodoListProps) => {
  const isDesktop = useMediaQuery(desktop)
  const [modalOpen, setModalOpen] = React.useState(open)

  React.useEffect(() => {
    setModalOpen(open)
  }, [open])

  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(modalOpen)
    }
  }, [modalOpen, onOpenChange])

  return (
    <ModalContext.Provider
      value={{ isDesktop, open: modalOpen, setOpen: setModalOpen }}
    >
      {isDesktop ? (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          {children}
        </Dialog>
      ) : (
        <Drawer open={modalOpen} onOpenChange={setModalOpen}>
          {children}
        </Drawer>
      )}
    </ModalContext.Provider>
  )
}

const TodoListTrigger = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListTrigger must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogTrigger className={className} {...props}>
      {children}
    </DialogTrigger>
  ) : (
    <DrawerTrigger className={className} {...props}>
      {children}
    </DrawerTrigger>
  )
}

const TodoListClose = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListClose must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogClose className={className} {...props}>
      {children}
    </DialogClose>
  ) : (
    <DrawerClose className={className} {...props}>
      {children}
    </DrawerClose>
  )
}

const TodoListContent = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListContent must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogContent className={className} {...props}>
      {children}
    </DialogContent>
  ) : (
    <DrawerContent className={className} {...props}>
      {children}
    </DrawerContent>
  )
}

const TodoListDescription = ({
  className,
  children,
  ...props
}: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListDescription must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogDescription className={className} {...props}>
      {children}
    </DialogDescription>
  ) : (
    <DrawerDescription className={className} {...props}>
      {children}
    </DrawerDescription>
  )
}

const TodoListHeader = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListHeader must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogHeader className={className} {...props}>
      {children}
    </DialogHeader>
  ) : (
    <DrawerHeader className={className} {...props}>
      {children}
    </DrawerHeader>
  )
}

const TodoListTitle = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListTitle must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogTitle className={className} {...props}>
      {children}
    </DialogTitle>
  ) : (
    <DrawerTitle className={className} {...props}>
      {children}
    </DrawerTitle>
  )
}

const TodoListBody = ({ className, children, ...props }: TodoListProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const TodoListFooter = ({ className, children, ...props }: TodoListProps) => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("TodoListFooter must be used within TodoListModal")
  }
  const { isDesktop } = context

  return isDesktop ? (
    <DialogFooter className={className} {...props}>
      {children}
    </DialogFooter>
  ) : (
    <DrawerFooter className={className} {...props}>
      {children}
    </DrawerFooter>
  )
}

export {
  TodoListModal,
  TodoListTrigger,
  TodoListClose,
  TodoListContent,
  TodoListDescription,
  TodoListHeader,
  TodoListTitle,
  TodoListBody,
  TodoListFooter,
}
