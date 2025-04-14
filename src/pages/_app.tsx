import type { AppProps } from "next/app"

import "@/styles/globals.css"

import AppLayout from "@/components/layouts/app-layout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
