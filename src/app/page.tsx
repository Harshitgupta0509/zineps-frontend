import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
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
      <main id="main-content" tabIndex={-1}>
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
      </main>
      <Footer />
    </>
  );
}
