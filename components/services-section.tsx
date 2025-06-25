"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tractor, Sprout, Fence, WallpaperIcon as Wall, Leaf } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  { icon: Tractor, title: "Lawn Maintenance", description: "Pristine mowing, trimming, and edging." },
  { icon: Sprout, title: "Lawn Seeding & Aeration", description: "Promote lush, healthy turf growth." },
  { icon: Fence, title: "Garden Bed Edging", description: "Clean, crisp edges for enhanced appeal." },
  { icon: Wall, title: "Hardscaping Solutions", description: "Patios, walkways, and retaining walls." },
  { icon: Leaf, title: "Seasonal Yard Cleanup", description: "Debris hauling and tidy landscapes." },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      // Using a subtle gradient or just bg-background for light theme
      className="py-16 md:py-24 bg-background" // Or use a very light gradient like bg-gradient-to-b from-background to-secondary/30
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Expert Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated craftsmanship for every aspect of your landscape. We bring your vision to life with precision and
            care.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={sectionVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Using standard card for light theme, glass-effect can be too much.
                  If glass is desired, ensure --glass-card-bg and --glass-card-border are light-theme appropriate.
              */}
              <Card
                className={cn(
                  "bg-card shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col rounded-xl overflow-hidden border border-border",
                )}
              >
                <CardHeader className="items-center text-center pt-8 pb-4 bg-primary/5">
                  {" "}
                  {/* Subtle gradient/color for header */}
                  <motion.div
                    className="bg-primary text-primary-foreground p-4 rounded-full mb-5 inline-block ring-4 ring-primary/10"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <service.icon className="h-8 w-8" />
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow px-6 pb-8">
                  <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
