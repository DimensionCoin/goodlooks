import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section" // Import the new section
import AboutUsSection from "@/components/about-us-section"
import SubscriptionPlansSection from "@/components/subscription-plans-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GallerySection /> {/* Add the GallerySection here */}
      <AboutUsSection />
      <SubscriptionPlansSection />
    </>
  )
}
