import { copy as c, integrations, site } from "@/content/site";
import { asset } from "@/content/images";
import { Section, Intro, Eyebrow, ProductImage, ButtonLink } from "../ui";
import { CountUp, RevealOnView } from "../motion";
import { RouteField } from "../logistics-experience";
import { GlobalScroll } from "../global-scroll";
import { JourneyRoute } from "../journey-route";
import { InteractiveCard } from "../interactive-card";
export function PlatformBenefits() {
  return (
    <Section id="why-zineps" className="muted">
      <Intro label={c.whyEy} title={c.whyH} />
      <div className="bento">
        <article className="benefit hub-card"><div className="aceternity-layer hub-static-layout">
          <Eyebrow>{c.hubEy}</Eyebrow>
          <h3>{c.hubH}</h3>
          <p>{c.hubP}</p>
          <ProductImage
            file="zineps-dashboard.svg"
            alt="Zineps unified shipping dashboard"
            className="dashboard-crop"
          />
        </div></article>
        <InteractiveCard className="benefit integrations-card">
          <Eyebrow>{c.intEy}</Eyebrow>
          <h3>{c.intH}</h3>
          <p>{c.intP}</p>
          <ProductImage
            file="integrations-mockup.svg"
            alt="Zineps platform, marketplace and WMS integrations"
          />
        </InteractiveCard>
        <InteractiveCard className="benefit analytics-card">
          <Eyebrow>Analytics</Eyebrow>
          <h3>{c.analyticsH}</h3>
          <p>{c.analyticsP}</p>
          <RevealOnView
            className="analytics-sample"
            role="img"
            aria-label="Zineps analytics illustration: 12.847, increase of 1.234"
          >
            <strong>
              <CountUp value="12,847" target={12847} />
            </strong>
            <span>+ 1.234</span>
            <div className="chart" aria-hidden="true">
              {[28, 44, 36, 58, 48, 68, 61].map((height, i) => (
                <div key={i}>
                  <i style={{ height: `${height}px` }} />
                  <small>{["Mo", "Tu", "Wo", "Th", "Fr", "Sa", "Su"][i]}</small>
                </div>
              ))}
            </div>
          </RevealOnView>
        </InteractiveCard>
        <InteractiveCard className="benefit global-card dark" variant="border">
          <Eyebrow>{c.globalEy}</Eyebrow>
          <h3>{c.globalH}</h3>
          <p>{c.globalP}</p>
          <dl className="global-stats">
            {["Worldwide", "Partners", "Shipments"].map((label, i) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <CountUp
                    value={c[`gsn${i}`]}
                    target={[200, 50, 1000][i]}
                  />
                  <br />
                  <span>{c[`gsl${i}`]}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="uptime">
            <strong>
              <CountUp value={c.gsn3} target={99.9} />
            </strong>
            <p>{c.gsl3}</p>
          </div>
          <h4>{c.uptimeH}</h4>
          <p className="caption">{c.uptimeP}</p>
        </InteractiveCard>
      </div>
    </Section>
  );
}
export function Integrations() {
  return (
    <Section id="integrations" className="mint">
      <Intro label={c.ecoEy} title={c.ecoH} description={c.ecoP} center />
      <div className="center-actions">
        <ButtonLink secondary href={`${site}/integrations`}>
          {c.ecoBtnT}
        </ButtonLink>
      </div>
      <div className="integration-ecosystem" aria-label="Zineps integrations">
        <div className="ecosystem-core" aria-hidden="true"><RouteField /><img src="/assets/zineps-logo-black.svg" width="118" height="36" alt="" /></div>
            <div className="ecosystem-logos">
              {[0, 1, 2].map((row) => {
                const logos = integrations.slice(row * 6, row * 6 + 6);
                return <div className={`logo-marquee logo-marquee-${row + 1}`} key={row}>
                  <div className="logo-track">
                    {[false, true].map((duplicate) => <ul className="logo-set" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                      {logos.map(([name, file]) => <li key={name}>
                        <img src={asset(file).src} alt={duplicate ? "" : name} width="120" height="48" loading="lazy" decoding="async" />
                      </li>)}
                    </ul>)}
                  </div>
                </div>;
              })}
            </div>
      </div>
      <JourneyRoute network />
    </Section>
  );
}
export function GlobalScale() {
  return <GlobalScroll />;
}
