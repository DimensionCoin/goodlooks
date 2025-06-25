"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) // Slower parallax for background image
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]) // Content fades out a bit faster
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]) // Content scales down slightly

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 + 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // Smoother ease
    }),
  }

  return (
    <section
      ref={targetRef}
      className="relative bg-background text-foreground h-[calc(100vh-0px)] min-h-[700px] md:min-h-[750px] overflow-hidden" // Adjusted height, removed header offset as header is transparent initially
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
        <Image
          src="/grasshero.png"
          alt="Serene landscaped garden at dawn"
          layout="fill"
          objectFit="cover"
          className="opacity-40" // Slightly more visible for depth
          priority
        />
        {/* Overlay for better text contrast and mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-10 via-background/40 to-background"></div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center h-full text-center pt-20" // Added padding-top to account for transparent header
      >
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground drop-shadow-md"
        >
          Crafting <span className="text-primary">Lasting Beauty</span>, Outdoors.
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground/90 drop-shadow-sm"
        >
          GoodLooks Landscaping: Where dedication meets design to transform your property into a stunning, sustainable
          haven.
        </motion.p>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-lg font-semibold w-full sm:w-auto rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="/quote">Get Your Free Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground/50 px-10 py-4 text-lg font-semibold w-full sm:w-auto rounded-lg shadow-md"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="/#services">Explore Our Services</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
