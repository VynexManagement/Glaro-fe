import React from "react";
import { HeroSection } from "../features/landing/_components/HeroSection";
import { TrustLogobar } from "../features/landing/_components/TrustLogobar";
import { HowItWorks } from "../features/landing/_components/HowItWorks";
import { OpportunitySignals } from "../features/landing/_components/OpportunitySignals";
import { WhyGlaro } from "../features/landing/_components/WhyGlaro";
import { FeatureGrid } from "../features/landing/_components/FeatureGrid";
import { AudienceSection } from "../features/landing/_components/AudienceSection";
import { OpportunityCatalog } from "../features/landing/_components/OpportunityCatalog";
import { PricingGrid } from "../features/landing/_components/PricingGrid";
import { FAQSection } from "../features/landing/_components/FAQSection";
import { CTASection } from "../features/landing/_components/CTASection";
import { ContactForm } from "../features/landing/_components/ContactForm";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full bg-white select-none overflow-x-hidden">
      <HeroSection />
      <TrustLogobar />
      <HowItWorks />
      <OpportunitySignals />
      <WhyGlaro />
      <FeatureGrid />
      <AudienceSection />
      <OpportunityCatalog />
      <PricingGrid />
      <FAQSection />
      <CTASection />
      <ContactForm />
    </div>
  );
}
