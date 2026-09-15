import { copy as c, integrations, site } from "@/content/site";
import { asset } from "@/content/images";
import { Section, Intro, Eyebrow, ProductImage, ButtonLink } from "../ui";
import { CountUp, RevealOnView } from "../motion";
export function PlatformBenefits() {
  return (
    <Section id="why-zineps" className="muted">
      <Intro label={c.whyEy} title={c.whyH} />
      <div className="bento">
        <article className="benefit hub-card">
          <Eyebrow>{c.hubEy}</Eyebrow>
          <h3>{c.hubH}</h3>
          <p>{c.hubP}</p>
          <ProductImage
            file="zineps-dashboard.svg"
            alt="Zineps unified shipping dashboard"
            className="dashboard-crop"
          />
        </article>
        <article className="benefit integrations-card">
          <Eyebrow>{c.intEy}</Eyebrow>
          <h3>{c.intH}</h3>
          <p>{c.intP}</p>
          <ProductImage
            file="integrations-mockup.svg"
            alt="Zineps platform, marketplace and WMS integrations"
          />
        </article>
        <article className="benefit analytics-card">
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
        </article>
        <article
          className="benefit global-card dark"
          data-future-visual="global-coverage"
        >
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
        </article>
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
      <div className="logo-marquee" aria-label="Zineps integrations">
        <div className="logo-marquee-track">
          {[false, true].map((duplicate) => (
            <ul className="logo-grid" aria-hidden={duplicate} key={String(duplicate)}>
              {integrations.map(([name, file]) => (
                <li key={`${duplicate}-${name}`}>
                  <img
                    src={asset(file).src}
                    alt={duplicate ? "" : name}
                    width="120"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
export function GlobalScale() {
  return (
    <Section id="global-scale" className="dark">
      <Intro
        label={c.globalScaleEy}
        title={c.globalScaleH}
        description={c.globalScaleP}
      />
      <dl className="scale-grid">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <dt>{c[`globalScaleD${i}`]}</dt>
            <dd>
              <CountUp
                value={c[`globalScaleN${i}`]}
                target={[300, 100, 12][i]}
              />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
