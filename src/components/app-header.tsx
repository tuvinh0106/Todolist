"use client"

import React from "react"
import { motion } from "framer-motion"

import AppLogo from "./app-logo"

export default function AppHeader() {
  return (
    <motion.div
      className={"flex flex-row items-center justify-between gap-4"}
      initial={{ opacity: 0, filter: "blur(10px)", y: -100 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={"flex items-center gap-2"}>
        <AppLogo />
        <span className={"font-semibold"}>Todolist</span>
        <span className={"hidden text-muted-foreground sm:block"}>
          application
        </span>
      </div>
    </motion.div>
  )
}
