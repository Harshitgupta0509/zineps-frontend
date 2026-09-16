"use client";
import { useState } from "react";
import { integrations } from "@/content/site";
const categories=["Stores & marketplaces","Carriers","Business systems"];
const groups=[["Shopify","WooCommerce","Amazon","Bol","Magento","Temu","CCV Shop"],["DHL","PostNL","DPD","UPS","Bpost","GLS","Fedex","Correos","DB Schenker"],["Exact","SnelStart"]];
const descriptions=["Bring orders from your sales channels into your shipping workflow.","Connect shipping services, labels and tracking in one place.","Connect your business administration with the rest of your shipping workflow."];
export function IntegrationExplorer(){
  const [category,setCategory]=useState(0),[selected,setSelected]=useState("Shopify");
  const list=integrations.filter(([name])=>groups[category].includes(name));
  const logo=integrations.find(([name])=>name===selected)!;
  return <div className="integration-explorer">
    <div className="explorer-controls" role="group" aria-label="Integration categories">{categories.map((label,i)=><button type="button" key={label} aria-pressed={category===i} onClick={()=>{setCategory(i);setSelected(groups[i][0]);}}>{label}<span>{groups[i].length.toString().padStart(2,"0")}</span></button>)}</div>
    <div className="explorer-body"><div className="explorer-options" role="group" aria-label="Choose an integration">{list.map(([name,file])=><button type="button" key={name} aria-pressed={selected===name} aria-label={name} onClick={()=>setSelected(name)}><img src={`/assets/${file}`} alt="" width="86" height="38"/><span>{name}</span><i aria-hidden="true">↗</i></button>)}</div>
    <div className="explorer-connection" aria-live="polite"><div className="connection-diagram" aria-hidden="true"><div><img src={`/assets/${logo[1]}`} alt="" width="66" height="36"/></div><span className="connection-wire"><i/></span><div><img src="/assets/zineps-logo-black.svg" alt="" width="92" height="32"/></div></div><span className="explorer-kicker">{categories[category]}</span><h3>{selected}, meet Zineps.</h3><p>{descriptions[category]}</p><a href="https://www.zineps.com/integrations">Explore integrations <span aria-hidden="true">↗</span></a><small>Illustrative connection</small></div></div>
  </div>;
}
