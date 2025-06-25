"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const galleryImages = [
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Beautifully manicured lawn",
    title: "Lush Lawn & Garden",
  },
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Elegant stone patio",
    title: "Stone Patio Oasis",
  },
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Modern hardscaping",
    title: "Sleek Hardscaping",
  },
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Crisply edged garden bed",
    title: "Defined Garden Edges",
  },
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Serene backyard water feature",
    title: "Tranquil Water Feature",
  },
  {
    src: "/placeholder.svg?width=600&height=400",
    alt: "Colorful seasonal flowers",
    title: "Vibrant Floral Display",
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function GallerySection() {
  return (
    <motion.section
      id="gallery"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">Our Project Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired by some of our recently completed landscaping projects. See the GoodLooks difference!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              style={{ aspectRatio: "3/2" }} // Replaces @tailwindcss/aspect-ratio
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-4">
                <motion.h3
                  className="text-white text-xl font-semibold"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }} // This needs to be controlled by group hover in Framer, or use CSS
                  transition={{ delay: 0.1, duration: 0.3 }} // This will trigger on load, not hover. For hover, CSS or JS state is better.
                >
                  {image.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
