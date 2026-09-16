import { copy as c, register, site, customers } from "@/content/site";
import {
  Section,
  Intro,
  Eyebrow,
  ProductImage,
  ButtonLink,
  Bullets,
} from "../ui";
import { CountUp } from "../motion";
import { ProductStage } from "../logistics-experience";
import { ShippingModes } from "../shipping-modes";
import { ShipmentPreview } from "../shipment-preview";
import { ParcelStory } from "../parcel-story";
import { JourneyRoute } from "../journey-route";
export function Hero() {
  return (
    <>
      <Section id="hero" className="hero">
        <div className="split hero-grid">
          <div className="hero-copy">
            <Eyebrow>{c.eyebrowLabel}</Eyebrow>
            <h1><span className="hero-opening">{c.headline.split("global logistics")[0]}</span><span className="headline-emphasis">global logistics</span></h1>
            <p className="lead">{c.description}</p>
            <div className="actions">
              <ButtonLink href={register}>{c.primaryCtaLabel}</ButtonLink>
              <ButtonLink href={`${site}/logistics-operating-system`} secondary>
                {c.partnerCtaLabel}
              </ButtonLink>
            </div>
          </div>
          <ShipmentPreview />
        </div>
        <div className="hero-proof-strip"><span><i/> One connected shipping workflow</span><a href="#why-zineps">Discover the platform <span aria-hidden="true">↓</span></a><span>Dashboard + API</span></div>
      </Section>
      <section className="trust container" aria-label="Trusted by">
        <p className="eyebrow">Trusted by</p>
        <div className="customer-marquee">
          <div className="customer-marquee-track">
            {[false,true].map(duplicate=><div className="customer-logos" aria-hidden={duplicate||undefined} key={String(duplicate)}>
              {customers.map(([name,file])=><img key={name} src={`/assets/${file}`} alt={duplicate?"":name} width="140" height="48" loading="lazy"/>)}
            </div>)}
          </div>
        </div>
      </section>
    </>
  );
}
export function PartnerRates() {
  return (
    <Section id="partner-rates" className="mint">
      <div className="split rates-grid">
        <div className="section-copy">
          <Intro label={c.ratesEy} title={c.ratesH} description={c.ratesP} />
          <div className="actions">
            <ButtonLink href={`${register}/new/7/SD`}>
              {c.ratesPrimaryT}
            </ButtonLink>
            <ButtonLink href={`${site}/pricing#partner-rates`} secondary>
              {c.ratesSecondaryT}
            </ButtonLink>
          </div>
        </div>
        <div>
          <ProductStage className="rates-stage"><ProductImage
            file="carrier-broker-mockup.svg"
            alt="Zineps shipping partner rates dashboard"
          /></ProductStage>
          <dl className="rate-stats">
            {[
              { value: "+20", target: 20, label: c.statPartnersL },
              { value: "+200", target: 200, label: c.statCountriesL },
              { value: "+1000", target: 1000, label: c.statMethodsL },
            ].map(({ value, target, label }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <CountUp value={value} target={target} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
export function ShippingSolutions() {
  return (
    <Section id="shipping">
      <ShippingModes labels={[c.commerceEy, c.b2bEy]}>
        {[
          {
            prefix: "commerce",
            image: "shippng-zineps.svg",
            alt: "Original Zineps e-commerce shipping interface",
            bullets: "cbl",
            count: 6,
            path: "/shipping",
          },
          {
            prefix: "b2b",
            image: "shipping-zineps-b2b.svg",
            alt: "Original Zineps B2B shipping interface",
            bullets: "bbl",
            count: 5,
            path: "/logistics-operating-system",
          },
        ].map((item) => (
          <article className="solution-card" key={item.prefix}>
            <Eyebrow>{c[`${item.prefix}Ey`]}</Eyebrow>
            <h2>{c[`${item.prefix}H`]}</h2>
            <p>{c[`${item.prefix}P`]}</p>
            <Bullets
              items={Array.from(
                { length: item.count },
                (_, i) => c[`${item.bullets}${i}T`],
              )}
            />
            <ProductImage file={item.image} alt={item.alt} />
            <ButtonLink secondary href={`${site}${item.path}`}>
              Read more
            </ButtonLink>
            <p className="caption">{c[`${item.prefix}Ideal`]}</p>
          </article>
        ))}
      </ShippingModes>
    </Section>
  );
}
export function ShippingAI() {
  return (
    <Section id="shipping-ai" className="dark">
      <ParcelStory>
        <div className="section-copy">
          <Intro label={c.aiEy} title={c.aiH} description={c.aiP} />
          <ButtonLink href={`${site}/ai-shipping-intelligence`}>
            {c.aiBtnT}
          </ButtonLink>
        </div>
      </ParcelStory>
    </Section>
  );
}
export function LogisticsPartners() {
  return (
    <Section id="logistics-partners">
      <div className="split partner-grid">
        <div className="partner-journey"><ProductStage className="partner-stage"><ProductImage
          file="zineps-partnerpanel.svg"
            alt="The real Zineps Partner Panel for logistics providers"
            className="partner-interface-main"
        /></ProductStage><JourneyRoute /></div>
        <div className="section-copy">
          <Intro
            label={c.partnerEy}
            title={c.partnerH}
            description={c.partnerP}
          />
          <Bullets items={Array.from({ length: 5 }, (_, i) => c[`pbl${i}T`])} />
          <ButtonLink href={`${site}/logistics-operating-system`}>
            {c.partnerBtnT}
          </ButtonLink>
          <p className="caption">{c.partnerBuilt}</p>
        </div>
      </div>
    </Section>
  );
}
