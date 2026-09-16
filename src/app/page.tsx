import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { ExperienceDirector } from "@/components/experience-director";
import {
  Hero,
  PartnerRates,
  ShippingSolutions,
  ShippingAI,
  LogisticsPartners,
} from "@/components/sections/product";
import {
  PlatformBenefits,
  Integrations,
  GlobalScale,
} from "@/components/sections/platform";
import {
  Difference,
  NetworkBridge,
  RecentNews,
  FinalConversion,
} from "@/components/sections/company";
export default function Home() {
  return (
    <>
      <Navigation />
      <ExperienceDirector>
        <Hero />
        <PartnerRates />
        <ShippingSolutions />
        <PlatformBenefits />
        <ShippingAI />
        <LogisticsPartners />
        <Integrations />
        <GlobalScale />
        <Difference />
        <Faq />
        <NetworkBridge />
        <RecentNews />
        <FinalConversion />
      </ExperienceDirector>
      <Footer />
    </>
  );
}
