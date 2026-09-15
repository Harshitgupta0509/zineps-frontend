import { copy as c, news, register, site } from "@/content/site";
import { Section, Intro, ButtonLink, Eyebrow, Arrow } from "../ui";
import { Newsletter } from "../newsletter";
import { RevealOnView } from "../motion";
export function Difference() {
  return (
    <Section id="difference">
      <Intro label={c.diffEy} title={c.diffH} description={c.diffP} />
      <div className="difference-grid">
        {[0, 1, 2, 3].map((i) => (
          <article className="difference-card" key={i}>
            <span className="card-number" aria-hidden="true">
              0{i + 1}
            </span>
            <h3>{c[`diffCardH${i}`]}</h3>
            <p>{c[`diffCardP${i}`]}</p>
          </article>
        ))}
      </div>
      <Newsletter />
    </Section>
  );
}
export function NetworkBridge() {
  return (
    <Section id="software-network" className="mint">
      <Intro title={c.bridgeH} />
      <h3 className="bridge-subtitle">Start where you are</h3>
      <p className="lead bridge-description">
        Merchants start shipping in minutes, including partner rates. Logistics
        partners digitize their offering and bring their merchants with them.
      </p>
      <div className="actions">
        <ButtonLink href={register}>{c.bridgePrimaryT}</ButtonLink>
        <ButtonLink href={`${site}/logistics-operating-system`} secondary>
          {c.bridgeSecondaryT}
        </ButtonLink>
      </div>
      <div className="bridge-grid">
        {["merchant", "logistics"].map((key) => (
          <article key={key}>
            <h3>{c[`${key}H`]}</h3>
            <p>{c[`${key}P`]}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function RecentNews() {
  return (
    <Section id="news">
      <div className="news-heading">
        <Intro
          title="Recent news"
          description="Stay updated with the latest news, updates, and insights from Zineps"
        />
        <ButtonLink secondary href={`${site}/newsroom`}>
          View all
        </ButtonLink>
      </div>
      <div className="news-grid">
        {news.map(([type, date, description, title, url]) => (
          <article key={url} className="news-card">
            <div className="news-meta">
              <Eyebrow>{type}</Eyebrow>
              <span>{date}</span>
            </div>
            <h3>
              <a href={`${site}${url}`}>
                {title}
                <Arrow />
              </a>
            </h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function FinalConversion() {
  return (
    <Section id="get-started">
      <RevealOnView className="final-banner dark">
        <h2>{c.finalH}</h2>
        <p className="lead">{c.finalP}</p>
        <div className="actions">
          <ButtonLink href={register}>{c.trialBtnT}</ButtonLink>
          <ButtonLink secondary href={`${site}/contact`}>
            {c.contactBtnT}
          </ButtonLink>
        </div>
      </RevealOnView>
      <div className="final-links">
        {[
          { key: "price", url: "/pricing" },
          { key: "startInt", url: "/integrations" },
        ].map(({ key, url }) => (
          <article key={key}>
            <h3>{c[`${key}H`]}</h3>
            <p>{c[`${key}P`]}</p>
            <ButtonLink secondary href={`${site}${url}`}>
              {c[`${key}BtnT`]}
            </ButtonLink>
          </article>
        ))}
      </div>
    </Section>
  );
}
