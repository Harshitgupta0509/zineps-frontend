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
import { BackgroundBeams } from "@/components/ui/background-beams";
import MovingLine from "@/components/ui/moving-line";
export function Hero() {
  return (
    <>
      <Section id="hero" className="hero">
        <BackgroundBeams className="hero-beams" />
        <div className="split hero-grid">
          <div className="hero-copy">
            <Eyebrow>{c.eyebrowLabel}</Eyebrow>
            <h1>{c.headline}</h1>
            <p className="lead">{c.description}</p>
            <div className="actions">
              <ButtonLink href={register}>{c.primaryCtaLabel}</ButtonLink>
              <ButtonLink href={`${site}/logistics-operating-system`} secondary>
                {c.partnerCtaLabel}
              </ButtonLink>
            </div>
          </div>
          <div className="product-stage" data-future-visual="logistics-network">
            <ProductImage
              file="zineps-dashboard.svg"
              alt="Zineps dashboard with sidebar, open orders, status cards and order table"
              priority
              className="hero-dashboard"
            />
          </div>
        </div>
      </Section>
      <section className="trust container" aria-label="Trusted by">
        <p className="eyebrow">Trusted by</p>
        <div className="customer-logos">
          {customers.map(([name, file]) => (
            <img
              key={name}
              src={`/assets/${file}`}
              alt={name}
              width="140"
              height="48"
              loading="lazy"
            />
          ))}
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
          <ProductImage
            file="carrier-broker-mockup.svg"
            alt="Zineps shipping partner rates dashboard"
          />
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
      <div className="solution-grid">
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
      </div>
    </Section>
  );
}
export function ShippingAI() {
  return (
    <Section id="shipping-ai" className="dark">
      <div className="split">
        <div className="section-copy">
          <Intro label={c.aiEy} title={c.aiH} description={c.aiP} />
          <ButtonLink href={`${site}/ai-shipping-intelligence`}>
            {c.aiBtnT}
          </ButtonLink>
        </div>
        <div
          className="network-space"
          data-future-visual="shipping-routes"
          aria-hidden="true"
        >
          <span>Merchant</span>
          <i><MovingLine /></i>
          <span className="network-hub">Zineps</span>
          <i><MovingLine delay={1.6} /></i>
          <span>Carrier</span>
        </div>
      </div>
    </Section>
  );
}
export function LogisticsPartners() {
  return (
    <Section id="logistics-partners">
      <div className="split partner-grid">
        <ProductImage
          file="zineps-partnerpanel.svg"
          alt="The real Zineps Partner Panel for logistics providers"
        />
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
