"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, UploadCloud, ImageIcon } from "lucide-react"
import Link from "next/link"

// Define plan details here or import from a shared file if they grow complex
const PLAN_DETAILS: Record<string, { name: string; isPremium: boolean; features: string[] }> = {
  "basic-care-package": {
    name: "Basic Care Package",
    isPremium: false,
    features: [
      "Weekly Lawn Mowing & Trimming",
      "One Spring Lawn Seeding Session",
      "Basic Edging",
      "Service from Mid March to Mid October",
    ],
  },
  "premium-green-package": {
    name: "Premium Green Package",
    isPremium: true,
    features: [
      "All Basic Package Features",
      "Seasonal Fertilization Program (4-step)",
      "Weed Control Treatments",
      "Spring & Fall Aeration",
      "Fall Leaf Cleanup",
      "Priority Scheduling",
    ],
  },
}

const PREMIUM_SURCHARGE_FACTOR = 1.3 // 30% more for premium

function calculateSeasonalPrice(sqFt: number, isPremium: boolean): number | null {
  let basePrice: number | null = null

  if (sqFt >= 100 && sqFt <= 499) basePrice = 1750
  else if (sqFt >= 500 && sqFt <= 999) basePrice = 2250
  else if (sqFt >= 1000 && sqFt <= 1499) basePrice = 2750
  else if (sqFt >= 1500 && sqFt <= 1999) basePrice = 3250
  else if (sqFt >= 2000 && sqFt <= 2999) basePrice = 3750
  else if (sqFt >= 3000 && sqFt <= 4999) basePrice = 4500
  else if (sqFt >= 5000) return null // Indicates "Contact Us"

  if (basePrice === null) return null // For sqFt < 100 or invalid ranges

  return isPremium ? Math.round(basePrice * PREMIUM_SURCHARGE_FACTOR) : basePrice
}

export default function SubscribePage() {
  const router = useRouter()
  const params = useParams()
  const planSlug = typeof params.planSlug === "string" ? params.planSlug : ""

  const [sqFt, setSqFt] = useState<string>("")
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [showContactUs, setShowContactUs] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const planDetail = PLAN_DETAILS[planSlug]

  useEffect(() => {
    if (!planDetail) {
      // Handle invalid plan slug, e.g., redirect or show error
      // For now, let's redirect to homepage or a plans page
      // router.push('/');
      return
    }

    const footage = Number.parseInt(sqFt)
    if (!isNaN(footage) && footage >= 100) {
      const price = calculateSeasonalPrice(footage, planDetail.isPremium)
      if (price === null && footage >= 5000) {
        setCalculatedPrice(null)
        setShowContactUs(true)
      } else {
        setCalculatedPrice(price)
        setShowContactUs(false)
      }
    } else {
      setCalculatedPrice(null)
      setShowContactUs(false)
    }
  }, [sqFt, planSlug, planDetail, router])

  const handleSqFtChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only numbers and ensure it's not negative
    if (/^\d*$/.test(value)) {
      setSqFt(value)
    }
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  if (!planDetail) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-700">Invalid Plan</h1>
        <p className="mt-2 text-gray-600">The selected subscription plan was not found.</p>
        <Button asChild className="mt-6">
          <Link href="/#pricing">View Plans</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-green-50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-green-700 text-center">
              Customize Your {planDetail.name}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2 text-center">
              Provide details about your lawn to get your personalized seasonal price. Service runs from Mid March to
              Mid October.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Plan Features:</h3>
              <ul className="space-y-2">
                {planDetail.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="sqFt" className="text-lg font-medium text-gray-700">
                  Lawn Square Footage
                </Label>
                <Input
                  id="sqFt"
                  type="text" // Use text to manage input as string then parse, allows empty state
                  inputMode="numeric" // Provides numeric keyboard on mobile
                  value={sqFt}
                  onChange={handleSqFtChange}
                  placeholder="e.g., 1200"
                  className="mt-1 text-lg p-3"
                  min="0" // HTML5 min, actual logic handles 100+
                />
                {Number.parseInt(sqFt) > 0 && Number.parseInt(sqFt) < 100 && (
                  <p className="text-sm text-red-600 mt-1">Minimum 100 sq ft for online pricing.</p>
                )}
              </div>

              <div>
                <Label htmlFor="imageUpload" className="text-lg font-medium text-gray-700">
                  Upload Image of Lawn Area (Optional)
                </Label>
                <div className="mt-1 flex justify-center items-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {imagePreview ? (
                      <img
                        src={
                          imagePreview || "/placeholder.svg?width=400&height=300&query=aerial+view+of+a+suburban+lawn"
                        }
                        alt="Lawn preview"
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <Input
                      id="imageUpload"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
                {imageFile && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2 text-green-600" />
                    {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                    <Button
                      variant="link"
                      size="sm"
                      className="ml-2 text-red-500"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                        ;(document.getElementById("imageUpload") as HTMLInputElement).value = ""
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {(calculatedPrice !== null || showContactUs) && (
              <div className="pt-6 border-t">
                {showContactUs ? (
                  <div className="text-center p-4 bg-yellow-100 border border-yellow-300 rounded-md">
                    <AlertCircle className="inline-block h-6 w-6 mr-2 text-yellow-600" />
                    <span className="text-xl font-semibold text-yellow-700">
                      For lawns 5000 sq ft or larger, please contact us for a custom quote.
                    </span>
                    <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                      <Link href="/quote">Contact Us</Link>
                    </Button>
                  </div>
                ) : calculatedPrice !== null && calculatedPrice > 0 ? (
                  <div className="text-center">
                    <p className="text-xl text-gray-700">Your Estimated Seasonal Price:</p>
                    <p className="text-5xl font-bold text-green-700 my-2">${calculatedPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      For the entire season (Mid March - Mid October). Includes all supplies for selected plan.
                    </p>
                  </div>
                ) : (
                  Number.parseInt(sqFt) >= 100 && (
                    <p className="text-center text-gray-600">
                      Enter valid square footage (100 sq ft or more) to see pricing.
                    </p>
                  )
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <Button
              type="submit" // This would eventually submit the form
              className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white text-lg py-3"
              disabled={!calculatedPrice || showContactUs || Number.parseInt(sqFt) < 100}
              onClick={() => alert("Proceeding to checkout (not implemented yet). Price: $" + calculatedPrice)}
            >
              Proceed to Checkout
            </Button>
            <Button variant="outline" asChild className="w-full max-w-xs">
              <Link href="/#pricing">Choose a Different Plan</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
