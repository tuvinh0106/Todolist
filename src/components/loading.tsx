import React from "react"
import { Oval } from "react-loader-spinner"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Oval
        visible={true}
        height="40"
        width="40"
        strokeWidth={4}
        color="hsl(var(--primary))"
        secondaryColor="hsl(var(--secondary))"
        ariaLabel="oval-loading"
      />
    </div>
  )
}
