const I = state.phase1Ids;
const F = state.fullHomeResult.renamedIds;
const C = [];
const set = (id, value) => C.push(`SET ${id} text=${JSON.stringify(value)};`);

set(I.productsLabel, "Products");
set(I.integrationsLabel, "Integrations");
set(I.pricingLabel, "Pricing");
set(I.blogLabel, "Blog");
set(I.knowledgeLabel, "Knowledge Base");
set(I.navCtaLabel, "Sign up for free");
set(I.productsSub0Label, "Shipping for e-commerce and SMEs");
set(I.productsSub1Label, "Platform for logistics service providers");
set(I.productsSub2Label, "Shipping AI");
set(I.knowledgeSub0Label, "Overview");
[
  "Products", "Integrations", "Pricing", "Blog", "Knowledge Base", "Help Center", "Sign up for free"
].forEach((v, i) => set(I[`mobileLink${i}Label`], v));

set(I.eyebrowLabel, "FOR BUSINESSES THAT SHIP, AND THE LOGISTICS PARTNERS THAT MOVE THEIR GOODS");
set(I.headline, "The intelligent layer for global logistics");
set(I.description, "One infrastructure with a dashboard and API. Use competitive shipping rates from our network of logistics service providers, your own shipping contracts, or both. Our intelligent matching engine connects you with partners who already hold high-volume deals with DHL, PostNL, DPD and dozens more.");
set(I.primaryCtaLabel, "Start shipping");
set(I.partnerCtaLabel, "I’m a logistics partner");

set(F.trustEy, "TRUSTED BY");
set(F.ratesEy, "PARTNER SHIPPING RATES");
set(F.ratesH, "Their purchasing power becomes yours");
set(F.ratesP, "Logistics partners on Zineps already have high-volume deals with DHL, PostNL, DPD and dozens of others. We match you with the partner whose lanes fit your shop. Use partner shipping rates, your own contracts, or both, from one dashboard.");
set(F.ratesPrimaryT, "Start for free");
set(F.ratesSecondaryT, "How partner rates work");
set(F.statPartnersL, "SHIPPING PARTNERS");
set(F.statCountriesL, "DESTINATION COUNTRIES");
set(F.statMethodsL, "SHIPPING METHODS");

set(F.commerceEy, "AUTOMATE SHIPPING PROCESS");
set(F.commerceH, "Smart shipping from label to return");
set(F.commerceP, "Less manual work, lower shipping costs, faster fulfilment, faster returns processing and higher customer satisfaction.");
["Automatic carrier selection based on price and speed", "Label generation", "Pickup and returns management", "Dynamic checkout integrations", "Use your own contracts or our partner network", "Branded tracking, packing slips and returns portal"].forEach((v, i) => set(F[`cbl${i}T`], v));
set(F.commerceBtnT, "Read more");
set(F.commerceIdeal, "Ideal for: E-commerce retailers • Online stores • Dropshipping");
set(F.b2bEy, "TRANSPORT MANAGEMENT & B2B SHIPPING");
set(F.b2bH, "Ship your business consignments");
set(F.b2bP, "More revenue per vehicle, less planning and administration. Gain new customers, make better use of your transport network and reduce support overhead.");
["Offer business shipping through Zineps", "Manage load orders, shipments and pickups", "Connect your own ERP systems or use our APIs", "Address validation engine", "Track and trace with performance dashboards"].forEach((v, i) => set(F[`bbl${i}T`], v));
set(F.b2bBtnT, "Read more");
set(F.b2bIdeal, "Ideal for: Wholesale distributors • Factories • B2B suppliers");

set(F.whyEy, "WHY ZINEPS");
set(F.whyH, "Everything you need for successful shipping");
set(F.hubEy, "ONE PLATFORM FOR EVERYTHING");
set(F.hubH, "Manage all your shipments, returns and logistics from one central hub");
set(F.hubP, "No hassle with multiple systems. Everything you need for successful shipping in one place.");
set(F.intEy, "FAST INTEGRATIONS");
set(F.intH, "Connect within minutes to your webshop, WMS or other systems");
set(F.intP, "Through our dashboard or comprehensive API, you can quickly and easily integrate with all popular platforms.");
set(F.analyticsEy, "ANALYTICS");
set(F.analyticsH, "Real-time insights and data-driven decisions");
set(F.analyticsP, "Track shipping performance in real time. Get deep insights to optimize logistics and reduce costs.");
set(F.globalEy, "GLOBAL COVERAGE");
set(F.globalH, "Ship to more than 200 countries worldwide");
set(F.globalP, "Access all major carriers and local providers worldwide.");
["200+ countries", "50+ logistics partners", "1000+ methods", "99.9% uptime"].forEach((v, i) => set(F[`gsn${i}`], v));
["Worldwide", "Available", "Ready to use", "Enterprise-grade reliability"].forEach((v, i) => set(F[`gsl${i}`], v));
set(F.uptimeH, "Scalability and uptime");
set(F.uptimeP, "Your platform scales automatically as you grow. With a 99.9% uptime guarantee, your shipping process remains operational at all times, regardless of volume.");

set(F.aiEy, "SHIPPING AI");
set(F.aiH, "Predict delays. Choose better routes. Pay less.");
set(F.aiP, "Shipping AI is the intelligence in the layer. It recommends the better carrier, route and rate for each shipment.");
set(F.aiBtnT, "Discover Shipping AI");
set(F.partnerEy, "FOR LOGISTICS PARTNERS");
set(F.partnerH, "The operating system for logistics service providers");
set(F.partnerP, "Publish rates, manage contracts and margins, invoice, handle support and onboard the merchants you already serve. They ship in Zineps. You retain the commercial relationship.");
["Publish rates and terms", "Manage contracts, customer groups and margins", "Invoice automatically per customer or shipment", "Onboard existing merchants on Zineps", "Retain the commercial relationship"].forEach((v, i) => set(F[`pbl${i}T`], v));
set(F.partnerBtnT, "Become a partner");
set(F.partnerBuilt, "Built for: Logistics service providers • Freight forwarders • 3PLs");

set(F.ecoEy, "INTEGRATIONS");
set(F.ecoH, "More than 100 integrations");
set(F.ecoP, "Connect Zineps effortlessly with popular marketplaces, e-commerce platforms and logistics partners. Optimize your workflow, reduce shipping costs and provide customers with a seamless shipping experience.");
set(F.ecoBtnT, "View integrations");
set(F.diffEy, "WHAT MAKES US DIFFERENT");
set(F.diffH, "An approach that goes beyond the standard");
set(F.diffP, "We are setting a new standard in shipping technology. With a focus on innovation, collaboration and customer centricity, we help e-commerce and logistics operate smarter and be ready for the future. Stay up to date.");
const difference = [
  ["Build together", "We build together with our customers and continuously improve based on their feedback."],
  ["Personal contact", "At Zineps, we stay close to our customers. We listen, think along and provide tailored support, so no one has to face it alone."],
  ["Strong partnerships", "Together with our partners, we offer competitive rates, smart workflows and valuable advice for webshops and logistics companies."],
  ["Focus on technology", "We build tools that make e-commerce and logistics faster and easier."]
];
difference.forEach(([h, p], i) => { set(F[`diffCardH${i}`], h); set(F[`diffCardP${i}`], p); });
set(F.newsletterT, "Stay up to date.");
set(F.emailPlaceholder, "Enter your email address");
set(F.emailBtnT, "Sign up");

set(F.faqEy, "FREQUENTLY ASKED QUESTIONS");
set(F.faqH, "Frequently asked questions");
set(F.faqP, "Frequently asked questions about Zineps and our platform.");
set(F.faqSearchT, "Search questions…");
const faq = [
  ["What exactly is Zineps?", "Zineps is an AI-driven platform that connects e-commerce businesses with logistics partners. Webshops automate their shipping process, while carriers manage their customers through the Partner Panel. Everything happens within one smart platform."],
  ["Who is Zineps for?", "Zineps is for both e-commerce businesses and logistics partners. Webshops use it to reduce shipping costs and automate processes. Partners such as carriers and brokers offer their services through the platform and manage everything centrally."],
  ["Do I need to already have a shipping contract?", "No. You can connect your own contracts, use competitive rates from our connected partners, or combine both."],
  ["Which systems does Zineps integrate with?", "Zineps integrates seamlessly with Shopify, WooCommerce, bol.com, Amazon, Exact, Lightspeed and many more. APIs are also available for custom integrations."],
  ["How much does Zineps cost?", "Zineps uses a transparent SaaS model with optional costs per shipment. We offer flexible plans tailored to whether you are a webshop or logistics partner."],
  ["How quickly can I get started?", "Within minutes. Connect your shop or register as a partner, then start shipping or offering logistics services immediately."]
];
faq.forEach(([q, a], i) => { set(F[`faqQ${i}`], q); set(F[`faqA${i}`], a); });

set(F.bridgeH, "Software, network and intelligence");
set(F.bridgeP, "Start where you are. Merchants begin shipping within minutes, including with partner shipping rates. Logistics partners digitize their offering and bring their merchants with them.");
set(F.bridgePrimaryT, "Start shipping");
set(F.bridgeSecondaryT, "I’m a logistics partner");
set(F.merchantH, "For businesses that ship");
set(F.merchantP, "Start shipping within minutes, with partner shipping rates, your own contracts, or both.");
set(F.logisticsH, "For logistics partners");
set(F.logisticsP, "Digitize your offering, serve the customers you already have, and bring them with you to Zineps.");

set(F.finalH, "Ready to get started?");
set(F.finalP, "Create an account now to get started or contact us for a tailored solution for your business.");
set(F.trialBtnT, "Start your trial");
set(F.contactBtnT, "Contact us");
set(F.priceH, "Know exactly what you pay");
set(F.priceP, "Transparent rates with no hidden costs.");
set(F.priceBtnT, "Pricing");
set(F.startIntH, "Start the integration now");
set(F.startIntP, "Get started with Zineps in 10 minutes.");
set(F.startIntBtnT, "Integrations");

set(F.fcolH0, "Products");
set(F.flt00, "Shipping for e-commerce and SMEs");
set(F.flt01, "Platform for logistics service providers");
set(F.flt02, "Shipping AI");
set(F.fcolH1, "Company");
["About us", "Blog", "Careers", "Privacy policy", "Terms and conditions"].forEach((v, i) => set(F[`flt1${i}`], v));
set(F.fcolH2, "Contact");
set(F.footerCopy, "The intelligent layer for global logistics.");
set(F.footerEnd, "Software, network and intelligence for e-commerce and logistics.");

state.englishCopyResult = await framer.agent.applyChanges(C.join('\n'), { pagePath: '/' });
console.log(state.englishCopyResult);
