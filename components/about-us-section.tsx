"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const textBlockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
}

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textBlockVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">About GoodLooks Landscaping</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              At GoodLooks Landscaping, we are passionate about creating and maintaining beautiful outdoor spaces. We
              work diligently to understand your unique needs and preferences, delivering high-quality results with
              competitive pricing.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Our commitment is to ensure every client is delighted with our work. We believe in building long-lasting
              relationships based on trust, reliability, and exceptional service. Your satisfaction is our top priority,
              and we strive to exceed your expectations on every project.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Let us bring our expertise and dedication to your property, transforming it into a landscape you'll love
              for years to come.
            </p>
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-xl border border-border"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <Image
              src="/placeholder.svg?width=600&height=450"
              alt="GoodLooks Landscaping team working"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
