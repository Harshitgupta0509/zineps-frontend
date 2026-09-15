const I = state.phase1Ids;
const F = state.fullHomeResult.renamedIds;
const C = [];
const q = v => JSON.stringify(String(v));
const attrs = o => Object.entries(o).map(([k,v]) => `${k}=${q(v)}`).join(' ');
const set = (id, o) => C.push(`SET ${id} ${attrs(o)};`);
const add = (type, id, o) => C.push(`+${type} ${id} ${attrs(o)};`);
const frame = (id, parent, o={}) => add('FrameNode', id, {name:id,parent,layout:'stack',stackDirection:'vertical',stackDistribution:'start',stackAlignment:'start',gap:'0px',overflow:'clip',position:'relative',width:'1fr',height:'auto',...o});
const text = (id, parent, value, o={}) => add('RichTextNode', id, {name:id,parent,text:value,fontName:'Geist',fontWeight:400,fontSize:'16px',lineHeight:'1.55em',textColor:'#4D5955',width:'1fr',height:'auto',position:'relative',...o});
const eyebrow = (id,parent,value,dark=false) => text(id,parent,value,{width:'auto',fontSize:'11px',fontWeight:650,letterSpacing:'1.4px',textColor:dark?'#A9E0D2':'#397466'});
const heading = (id,parent,value,dark=false) => text(id,parent,value,{tag:'h2',fontSize:'48px',fontWeight:600,lineHeight:'1.08em',letterSpacing:'-1.8px',textColor:dark?'#F4F8F6':'#333B38'});
const button = (id,parent,label,url,primary=true) => { frame(id,parent,{name:label,width:'auto',padding:'15px 22px',radius:'7px',fill:primary?'#70CAB9':'#FFFFFF',border:primary?'1px solid #70CAB9':'1px solid #DCE5E2',stackDirection:'horizontal',stackAlignment:'center',gap:'10px','link.href':url,'hoverEffect.opacity':0.84,overflow:'visible'}); text(id+'T',id,label,{width:'auto',fontWeight:600,fontSize:'15px',textColor:'#173B35'}); };

// Navigation and hero: exact current English source wording.
set(I.productsSub0Label,{text:'Shipping for e-commerce & SMEs'});
set(I.productsSub1Label,{text:'Platform for logistics providers'});
set(I.navCtaLabel,{text:'Sign up for free'});
set(I.eyebrowLabel,{text:'FOR BUSINESSES THAT SHIP, AND THE LOGISTICS PARTNERS THAT MOVE THEIR GOODS'});
set(I.headline,{text:'The intelligent layer for global logistics'});
set(I.description,{text:'One infrastructure with a dashboard and API. Use competitive shipping rates from our network of logistics service providers, your own shipping contracts, or both. Our intelligent matching engine connects you with partners who already hold high-volume deals with DHL, PostNL, DPD and dozens more.'});
set(I.primaryCtaLabel,{text:'Start shipping'});
set(I.partnerCtaLabel,{text:"I'm a logistics partner"});
set(I.supportLine,{visible:false});
frame('finalLang',I.navActions,{name:'English language selector',index:'0',width:'auto',padding:'9px 12px',radius:'6px',border:'1px solid #B8C2BE',stackDirection:'horizontal',stackAlignment:'center'});
text('finalLangT','finalLang','🇬🇧 EN',{width:'auto',fontSize:'13px',fontWeight:500,textColor:'#424242'});

// Exact source copy across existing sections.
set(F.ratesH,{text:'Their buying power becomes yours'});
set(F.ratesP,{text:'Logistics partners on Zineps already hold high-volume deals with DHL, PostNL, DPD and dozens more. We match you to the partner whose lanes fit your shop. Use partner shipping rates, your own contracts, or both, from one dashboard.'});
set(F.ratesPrimaryT,{text:'Start free'});
set(F.pathsEy,{visible:false});
set(F.pathsH,{visible:false});
set(F.commerceH,{text:'Smart shipping from label to return.'});
set(F.commerceP,{text:'Less manual work, lower shipping costs, faster fulfillment, faster return processing and more customer satisfaction.'});
['Automatic carrier selection based on price and speed','Label generation','Pickup & return management','Dynamic checkout integrations','Use own contracts or partner network','Branded tracking, packing slips and return portal.'].forEach((v,i)=>set(F[`cbl${i}T`],{text:v}));
set(F.b2bH,{text:'Send your business shipments'});
set(F.b2bP,{text:'More revenue per vehicle, less planning & administration. New customers, better utilization of transport network and less support overhead.'});
['Offer business shipping via Zineps','Manage load orders, shipments and pick-ups','Connect own ERP systems or use our APIs','Address validation engine','Tracking & trace and performance dashboards'].forEach((v,i)=>set(F[`bbl${i}T`],{text:v}));
set(F.whyH,{text:'Everything you need for successful shipping'});
set(F.hubH,{text:'Manage all your shipments, returns and logistics from one central hub'});
set(F.intEy,{text:'FAST INTEGRATIONS'});
set(F.intH,{text:'Connect within minutes with your webshop, WMS or other systems'});
set(F.intP,{text:'Through our dashboard or extensive API, you can quickly and easily integrate with all popular platforms.'});
set(F.analyticsH,{text:'Real-time insights and data-driven decisions'});
set(F.analyticsP,{text:'Track your shipping performance in real-time. Get deep insights to optimize your logistics and reduce costs.'});
set(F.globalH,{text:'Ship to more than 200+ countries worldwide'});
set(F.globalP,{text:'You have access to all major carriers and local transporters worldwide.'});
['200+ countries','50+ logistics partners','1000+ methods','99.9% Uptime'].forEach((v,i)=>set(F[`gsn${i}`],{text:v}));
['Active','Available','Now','Enterprise-grade security and reliability for all your shipments'].forEach((v,i)=>set(F[`gsl${i}`],{text:v}));
set(F.uptimeH,{text:'Scalability & Uptime — Enterprise-grade reliability and 99.9% uptime guarantee'});
set(F.uptimeP,{text:'Your platform automatically scales with your growth. With a 99.9% uptime guarantee, your shipping process always remains operational, regardless of volume.'});
set(F.aiH,{text:'Predict delays. Pick better routes. Spend less.'});
set(F.aiP,{text:'Shipping AI is the intelligence in the layer. It recommends the better carrier, route, and rate for every shipment.'});
set(F.aiBtnT,{text:'Explore Shipping AI'});
set(F.partnerH,{text:'The operating system for logistics providers'});
set(F.partnerP,{text:'Publish rates, manage contracts and margins, invoice, handle support, and onboard the merchants you already serve. They ship in Zineps. You keep the commercial relationship.'});
['Publish rates and conditions','Manage contracts, customer groups and margins','Invoice automatically per customer or shipment','Onboard existing merchants onto Zineps','Keep the commercial relationship'].forEach((v,i)=>set(F[`pbl${i}T`],{text:v}));
set(F.partnerBuilt,{text:'Built for: Logistics providers • Freight forwarders • 3PLs'});
set(F.ecoH,{text:'More than 100+ integrations'});
set(F.ecoP,{text:'Connect Zineps seamlessly with popular marketplaces, e-commerce platforms and logistics partners. Optimize your workflow, reduce your shipping costs and offer your customers a seamless shipping experience.'});
set(F.diffEy,{text:'THIS MAKES US DIFFERENT'});
set(F.diffP,{text:'We set a new standard in shipping technology. With a focus on innovation, collaboration, and customer-centricity, we help e-commerce and logistics operate smarter and future-proof. Stay updated.'});
const differences=[['Building together','We build together with our customers and continuously improve based on their feedback.'],['Personal contact','At Zineps, we stay close to our customers. We listen, think along, and provide tailored support, so no one is left alone.'],['Strong partnerships','Together with our partners, we offer competitive rates, smart workflows, and valuable advice for both online stores and logistics providers.'],['Focus on technology','We build tools that make e-commerce and logistics faster and easier.']];
differences.forEach(([h,p],i)=>{set(F[`diffCardH${i}`],{text:h});set(F[`diffCardP${i}`],{text:p});});
set(F.newsletterT,{text:'Stay updated.'});
set(F.emailPlaceholder,{text:''});
set(F.emailBtnT,{text:'Subscribe'});

set(F.faqEy,{visible:false});
set(F.faqH,{text:'Frequently Asked Questions'});
set(F.faqP,{text:'Frequently asked questions about Zineps and our platform.'});
const faqs=[
['What exactly is Zineps?','Zineps is an AI-driven platform that connects e-commerce with logistics partners. Online stores automate their shipping process, and carriers manage their customers via the Partner Panel. Everything happens within one smart platform.'],
['Who is Zineps for?','For both e-commerce companies and logistics partners. Online stores use Zineps to reduce shipping costs and automate processes. Partners such as carriers and brokers offer their services through our platform and manage everything centrally.'],
['Do I need to have a shipping contract already?',"No, that's not necessary. You can connect your own contracts, but also take advantage of favorable rates from our affiliated partners."],
['Which systems does Zineps integrate with?','Zineps integrates seamlessly with Shopify, WooCommerce, Bol.com, Amazon, Exact, Lightspeed and many more. In addition, APIs are available for custom integrations.'],
['What does it cost to use Zineps?','Zineps works with a transparent SaaS model and optional costs per shipment. Depending on your user type (online store or partner), we offer flexible packages tailored to your needs.'],
['How quickly can I get started?','Within minutes. Connect your shop or register as a partner, and start shipping or offering your logistics services immediately.']];
faqs.forEach(([h,p],i)=>{set(F[`faqQ${i}`],{text:h});set(F[`faqA${i}`],{text:p});});
set(F.bridgeH,{text:'Software, network, and intelligence'});
set(F.bridgeP,{text:'Start where you are. Merchants start shipping in minutes, including partner rates. Logistics partners digitize their offering and bring their merchants with them.'});
set(F.bridgeSecondaryT,{text:"I'm a logistics partner"});
set(F.merchantP,{text:'Start shipping in minutes, including partner shipping rates, your own contracts, or both.'});
set(F.logisticsP,{text:'Digitize your offering, serve the customers you already have, and bring them onto Zineps.'});
set(F.finalH,{text:'Get started right away?'});
set(F.finalP,{text:'Create an account to get started or contact us for a customized solution for your business.'});
set(F.priceP,{text:'Clear rates without hidden costs.'});
set(F.startIntH,{text:'Start with the integration now'});
set(F.startIntP,{text:'Start with Zineps in 10 minutes.'});
set(F.footerCopy,{text:'© 2025 Zineps.'});
set(F.flt00,{text:'Shipping for e-commerce & SMEs'});
set(F.flt01,{text:'Platform for logistics providers'});
set(F.flt13,{text:'Privacy Policy'});
set(F.footerEnd,{visible:false});

// Current live-site proof section, inserted in the source order after integrations.
frame('globalScale','WQLkyLRf1',{name:'Global scale',maxWidth:'1440px',padding:'132px 64px',fill:'#1E332E',gap:'54px',overflow:'visible'});
frame('globalScaleIntro','globalScale',{maxWidth:'860px',gap:'22px'});
eyebrow('globalScaleEy','globalScaleIntro','GLOBAL SCALE',true);
heading('globalScaleH','globalScaleIntro','The intelligent layer behind global logistics',true);
text('globalScaleP','globalScaleIntro','One infrastructure for global logistics. A platform for businesses that ship, and a network of logistics service providers that move their goods. Our intelligent matching engine connects you with partners at competitive shipping rates, your own contracts, or both. We work globally and help companies of any size integrate and scale on one platform.',{fontSize:'17px',textColor:'#C4D5CF'});
frame('globalScaleStats','globalScale',{layout:'grid',gridColumnCount:3,gridColumnMinWidth:'250px',gridRowHeightType:'auto',gap:'20px',overflow:'visible'});
[['300+ million','goods are transported yearly nationally and internationally with the help of Zineps.'],['100+ million','of economic value is annually created by merchants who ship via Zineps.'],['12+ million','parcels are processed efficiently annually with the help of our system.']].forEach(([n,p],i)=>{frame('globalScaleStat'+i,'globalScaleStats',{height:'1fr',padding:'30px',radius:'10px',border:'1px solid rgba(169,224,210,0.22)',gap:'14px'});text('globalScaleN'+i,'globalScaleStat'+i,n,{fontSize:'38px',fontWeight:600,lineHeight:'1em',letterSpacing:'-1.5px',textColor:'#F4F8F6'});text('globalScaleD'+i,'globalScaleStat'+i,p,{fontSize:'14px',textColor:'#BBD0C9'});});
C.push('MOVE globalScale parent="WQLkyLRf1" index="9";');

// Recent news representation using the current three newest source items.
frame('recentNews','WQLkyLRf1',{name:'Recent news',maxWidth:'1440px',padding:'132px 64px',gap:'48px',overflow:'visible'});
frame('recentNewsHead','recentNews',{stackDirection:'horizontal',stackAlignment:'end',stackDistribution:'space-between',overflow:'visible'});
frame('recentNewsCopy','recentNewsHead',{width:'720px',gap:'18px'});heading('recentNewsH','recentNewsCopy','Recent news');text('recentNewsP','recentNewsCopy','Stay updated with the latest news, updates, and insights from Zineps',{fontSize:'17px'});button('recentNewsAll','recentNewsHead','View all','https://www.zineps.com/newsroom',false);
frame('recentNewsGrid','recentNews',{layout:'grid',gridColumnCount:3,gridColumnMinWidth:'280px',gridRowHeightType:'auto',gap:'20px',overflow:'visible'});
const news=[
['NEWS','July 23, 2026','Amsterdam, The Netherlands, Zineps has successfully closed its late-seed investment round.','Zineps closes late-seed investment to accelerate its next phase of growth','https://www.zineps.com/newsroom/late-seed'],
['UPDATES','July 20, 2026','Full customs-data support for bulk shipment imports, EORI and VAT autofill in the address book, corrected bol.','Late July 2026 Platform Update: Bulk Customs Automation, Smarter Address Books, and More Reliable Carriers','https://www.zineps.com/newsroom/late-july-2026-platform-update'],
['NEWS','May 15, 2026','Native shipping, tracking, and delivery automation for Ukrainian ecommerce','Zineps now integrates with Nova Post','https://www.zineps.com/newsroom/zineps-customers-can-now-connect-nova-post-directl']];
news.forEach(([type,date,summary,title,url],i)=>{frame('newsCard'+i,'recentNewsGrid',{height:'1fr',padding:'30px',fill:'#FFFFFF',border:'1px solid #E3EAE7',radius:'10px',gap:'15px','link.href':url});text('newsType'+i,'newsCard'+i,type,{width:'auto',fontSize:'11px',fontWeight:650,letterSpacing:'1px',textColor:'#397466'});text('newsDate'+i,'newsCard'+i,date,{fontSize:'12px',textColor:'#7A8580'});text('newsTitle'+i,'newsCard'+i,title,{tag:'h3',fontSize:'21px',fontWeight:600,lineHeight:'1.25em',textColor:'#333B38'});text('newsSummary'+i,'newsCard'+i,summary,{fontSize:'14px'});});
C.push('MOVE recentNews parent="WQLkyLRf1" index="13";');

set('augiA20Il',{'metadata.title':'AI Shipping Software for e-commerce & Logistics | Zineps','metadata.description':'One infrastructure with a dashboard and API for businesses that ship and the logistics partners that move their goods.'});
state.finalVerificationResult = await framer.agent.applyChanges(C.join('\n'),{pagePath:'/'});
console.log(state.finalVerificationResult);
