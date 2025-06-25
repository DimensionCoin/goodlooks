"use client"

import { useState, useEffect, useMemo, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

type ServiceType = "tiered" | "contact"

interface Service {
  id: string
  label: string
  type: ServiceType
  description: string
  pricingTiers?: { minSqFt: number; maxSqFt: number; price: number }[]
  basePrice?: number
}

const SERVICES_CONFIG: Service[] = [
  {
    id: "lawn-cutting",
    label: "Lawn Cutting (Single Cut)",
    type: "tiered",
    description: "Professional mowing, trimming, and edging for a sharp look.",
    pricingTiers: [
      { minSqFt: 100, maxSqFt: 499, price: 125 },
      { minSqFt: 500, maxSqFt: 999, price: 150 },
      { minSqFt: 1000, maxSqFt: 1499, price: 175 },
      { minSqFt: 1500, maxSqFt: 1999, price: 200 },
      { minSqFt: 2000, maxSqFt: 2999, price: 225 },
      { minSqFt: 3000, maxSqFt: 4999, price: 250 },
    ],
  },
  {
    id: "hedge-trimming",
    label: "Hedge Trimming",
    type: "tiered",
    description: "Shaping and trimming of hedges and shrubs. Estimate based on property size.",
    pricingTiers: [
      { minSqFt: 100, maxSqFt: 999, price: 50 },
      { minSqFt: 1000, maxSqFt: 1999, price: 100 },
      { minSqFt: 2000, maxSqFt: 2999, price: 150 },
      { minSqFt: 3000, maxSqFt: 4999, price: 200 },
    ],
  },
  {
    id: "seeding-aeration",
    label: "Lawn Seeding & Aeration",
    type: "tiered",
    description: "Core aeration and overseeding to promote a thick, healthy turf.",
    pricingTiers: [
      { minSqFt: 100, maxSqFt: 499, price: 150 },
      { minSqFt: 500, maxSqFt: 999, price: 200 },
      { minSqFt: 1000, maxSqFt: 1499, price: 250 },
      { minSqFt: 1500, maxSqFt: 1999, price: 300 },
      { minSqFt: 2000, maxSqFt: 2999, price: 375 },
      { minSqFt: 3000, maxSqFt: 4999, price: 450 },
    ],
  },
  {
    id: "garden-edging",
    label: "Garden Bed Edging",
    type: "tiered",
    description: "Creating clean, defined edges for your garden and flower beds.",
    pricingTiers: [
      { minSqFt: 100, maxSqFt: 999, price: 30 },
      { minSqFt: 1000, maxSqFt: 1999, price: 50 },
      { minSqFt: 2000, maxSqFt: 2999, price: 75 },
      { minSqFt: 3000, maxSqFt: 4999, price: 100 },
    ],
  },
  {
    id: "yard-cleanup",
    label: "Lawn & Yard Cleanup",
    type: "contact",
    description: "Seasonal cleanups, leaf removal, and debris hauling. Price varies greatly.",
  },
  {
    id: "hardscaping",
    label: "Hardscaping",
    type: "contact",
    description: "Patios, walkways, retaining walls. Requires a detailed consultation.",
  },
]

function calculateTieredPrice(sqFt: number, service: Service): number | null {
  if (sqFt >= 5000) return null // Contact us for large properties
  if (!service.pricingTiers) return null

  const tier = service.pricingTiers.find((t) => sqFt >= t.minSqFt && sqFt <= t.maxSqFt)
  return tier ? tier.price : null
}

export default function QuotePage() {
  const [sqFt, setSqFt] = useState("")
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({})
  const [estimates, setEstimates] = useState<Record<string, number | null>>({})

  const handleSqFtChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setSqFt(value)
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  useEffect(() => {
    const footage = Number.parseInt(sqFt)
    const newEstimates: Record<string, number | null> = {}

    SERVICES_CONFIG.forEach((service) => {
      if (service.type === "tiered" && footage >= 100) {
        newEstimates[service.id] = calculateTieredPrice(footage, service)
      } else {
        newEstimates[service.id] = null
      }
    })
    setEstimates(newEstimates)
  }, [sqFt])

  const { total, contactRequired } = useMemo(() => {
    let currentTotal = 0
    let needsContact = false

    for (const serviceId in selectedServices) {
      if (selectedServices[serviceId]) {
        const service = SERVICES_CONFIG.find((s) => s.id === serviceId)
        if (service?.type === "contact") {
          needsContact = true
        } else if (estimates[serviceId]) {
          currentTotal += estimates[serviceId]!
        } else if (service?.type === "tiered") {
          // A tiered service is selected but has no price (e.g., sqft too high/low)
          needsContact = true
        }
      }
    }
    return { total: currentTotal, contactRequired: needsContact }
  }, [selectedServices, estimates])

  return (
    <div className="bg-green-50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-green-700">Get a Free Quote</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              Select services and enter your lawn size for an instant estimate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              {/* Step 1: Lawn Size */}
              <div>
                <Label htmlFor="sqFt" className="text-xl font-semibold text-gray-800">
                  1. Enter Your Lawn's Square Footage
                </Label>
                <Input
                  id="sqFt"
                  type="text"
                  inputMode="numeric"
                  value={sqFt}
                  onChange={handleSqFtChange}
                  placeholder="e.g., 1200"
                  className="mt-2 text-lg p-3"
                />
                {Number(sqFt) > 0 && Number(sqFt) < 100 && (
                  <p className="text-sm text-red-600 mt-1">Minimum 100 sq ft for online estimates.</p>
                )}
              </div>

              {/* Step 2: Select Services */}
              <div>
                <Label className="text-xl font-semibold text-gray-800">2. Select Your Services</Label>
                <div className="mt-2 space-y-4">
                  {SERVICES_CONFIG.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border rounded-lg transition-all has-[:checked]:bg-green-100 has-[:checked]:border-green-400"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={service.id}
                            checked={!!selectedServices[service.id]}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor={service.id} className="font-bold text-base text-gray-800 cursor-pointer">
                              {service.label}
                            </Label>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right pl-2">
                          {service.type === "contact" ? (
                            <span className="text-sm font-semibold text-blue-600">Contact for Quote</span>
                          ) : estimates[service.id] ? (
                            <span className="text-lg font-bold text-green-700">${estimates[service.id]}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Enter Sq. Ft.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Estimate */}
              <div className="pt-6 border-t-2 border-dashed">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                  <span className="text-xl font-bold text-gray-800">Estimated Total:</span>
                  {contactRequired ? (
                    <div className="text-right">
                      <span className="text-xl font-bold text-blue-700">Custom Quote Required</span>
                      <p className="text-sm text-gray-600">Final price will be provided after review.</p>
                    </div>
                  ) : (
                    <span className="text-3xl font-extrabold text-green-700">${total.toLocaleString()}</span>
                  )}
                </div>
                {Number(sqFt) >= 5000 && (
                  <div className="mt-2 text-sm text-yellow-800 bg-yellow-100 p-2 rounded-md flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      For properties 5,000 sq ft or larger, a custom quote is required for accuracy. Please submit your
                      request.
                    </span>
                  </div>
                )}
              </div>

              {/* Step 3: Your Information */}
              <div>
                <Label className="text-xl font-semibold text-gray-800">3. Your Information</Label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Full Name
                    </Label>
                    <Input id="name" type="text" placeholder="John Doe" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number
                    </Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Property Address
                    </Label>
                    <Input id="address" type="text" placeholder="123 Main St, Anytown" className="mt-1" />
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Additional Details or Questions
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide any other relevant information about your project."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3">
                Submit for Final Quote
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center mt-8 text-gray-600">
          Or,{" "}
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium underline">
            return to the homepage
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
