"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { motion } from "framer-motion"
import {
  ClerkProvider,

} from "@clerk/nextjs";
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ClerkProvider now truly wraps your whole App */}
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
const Footer = () => {
  return (
    <motion.footer
      className="bg-card text-muted-foreground py-8 text-center border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} GoodLooks Landscaping. All rights reserved.</p>
        <p className="text-sm mt-2">
          <Link href="/privacy-policy" className="hover:text-primary">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-of-service" className="hover:text-primary">
            Terms of Service
          </Link>
        </p>
      </div>
    </motion.footer>
  )
}
