"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    slug: "basic-care-package",
    name: "Basic Care Package",
    description: "Essential maintenance for a healthy lawn.",
    features: [
      "Weekly Lawn Mowing & Trimming",
      "One Spring Lawn Seeding Session",
      "Basic Edging",
      "Service from Mid March to Mid October",
    ],
    cta: "Customize Basic Plan",
    popular: false,
  },
  {
    slug: "premium-green-package",
    name: "Premium Green Package",
    description: "Comprehensive care for a vibrant lawn.",
    features: [
      "All Basic Package Features",
      "Seasonal Fertilization Program (4-step)",
      "Weed Control Treatments",
      "Spring & Fall Aeration",
      "Fall Leaf Cleanup",
      "Priority Scheduling",
    ],
    cta: "Customize Premium Plan",
    popular: true,
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function SubscriptionPlansSection() {
  return (
    <motion.section
      id="pricing"
      className="py-16 md:py-24 bg-background" // Changed background for variety
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">Seasonal Maintenance Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your lawn looking its best from Mid March to Mid October with our hassle-free subscription packages.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0px 15px 25px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 280 }}
            >
              <Card
                className={`shadow-lg flex flex-col h-full ${plan.popular ? "border-2 border-green-600 relative ring-4 ring-primary/30" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1.5 text-sm font-bold rounded-full shadow-md z-10">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pt-10">
                  <CardTitle className="text-2xl font-bold text-primary">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground min-h-[40px]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className={`w-full text-lg py-3 ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}
                  >
                    <Link href={`/subscribe/${plan.slug}`}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.p variants={itemVariants} className="text-center mt-8 text-muted-foreground">
          All plans cover the summer season from mid-March to mid-October. Supplies included.
        </motion.p>
      </div>
    </motion.section>
  )
}
