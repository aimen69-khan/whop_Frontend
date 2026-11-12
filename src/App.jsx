import React, { useState } from "react";
import { ArrowUpRight, Check, ShieldCheck, Clock3, Star, Menu, X, Phone, MapPin, Hammer, House, Search, ChevronRight } from "lucide-react";
import CheckoutPanel from "./Checkout.jsx";
import { trackWhop } from "./whop.js";

const services = [
  {n:"01",title:"Roof Repair",desc:"Fast, precise repairs for leaks, storm damage, missing shingles and flashing.",icon:<Hammer/>},
  {n:"02",title:"Roof Replacement",desc:"A complete roofing system installed with durable materials and careful cleanup.",icon:<House/>},
  {n:"03",title:"Roof Inspection",desc:"A clear condition report, photos and practical next steps before small issues grow.",icon:<Search/>}
];
const plans = [
  {key:"inspection",name:"Roof Inspection",price:"$149",detail:"On-site inspection + photo report",tag:"START HERE"},
  {key:"deposit",name:"Project Deposit",price:"$500",detail:"Reserve your approved roofing project",tag:"PROJECT START"},
  {key:"flat",name:"Roof Tune-Up",price:"$399",detail:"Flat-rate minor maintenance visit",tag:"POPULAR"}
];
const areas = ["Austin","Round Rock","Cedar Park","Pflugerville","Georgetown","Lakeway","Leander","Bee Cave"];

export default function App() {
  const [menu,setMenu] = useState(false);
  const [checkout,setCheckout] = useState(null);
  const [form,setForm] = useState({name:"",email:"",phone:"",zip:"",service:"Roof inspection",details:""});
  const [status,setStatus] = useState("");
  const [loading,setLoading] = useState(false);

  const openPlan = (plan) => {
    const ids = {
      inspection: import.meta.env.VITE_WHOP_INSPECTION_PLAN_ID,
      deposit: import.meta.env.VITE_WHOP_DEPOSIT_PLAN_ID,
      flat: import.meta.env.VITE_WHOP_FLAT_RATE_PLAN_ID
    };
    trackWhop("deposit_started", {plan_type: plan.key, plan_name: plan.name});
    setCheckout({...plan, planId: ids[plan.key]});
  };

  async function submitEstimate(e) {
    e.preventDefault(); setLoading(true); setStatus("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/leads`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit request.");
      trackWhop("estimate_requested", {service:form.service});
      setStatus("Thanks! Your estimate request was sent. Our team will contact you shortly.");
      setForm({name:"",email:"",phone:"",zip:"",service:"Roof inspection",details:""});
    } catch(err) { setStatus(err.message); }
    finally { setLoading(false); }
  }

  function viewService(name) { trackWhop("service_viewed", {service_name:name}); }

  return <div>
    <div className="topbar"><span><ShieldCheck size={14}/> Licensed • Insured • Locally Trusted</span><span><Phone size={14}/> (512) 555-0184 <b>24/7 Storm Response</b></span></div>
    <header className="header">
      <a href="#" className="brand"><span className="brand-mark">S</span><span>SUMMIT<span className="brand-sub">ROOFING CO.</span></span></a>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      <nav className={menu?"nav open":"nav"}><a href="#services" onClick={()=>setMenu(false)}>Services</a><a href="#process" onClick={()=>setMenu(false)}>Our Process</a><a href="#areas" onClick={()=>setMenu(false)}>Service Area</a><a href="#reviews" onClick={()=>setMenu(false)}>Reviews</a><a href="#pricing" onClick={()=>setMenu(false)}>Pricing</a></nav>
      <a className="btn btn-dark header-cta" href="#estimate">Get a Free Estimate <ArrowUpRight size={16}/></a>
    </header>

    <main>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow"><span></span> CENTRAL TEXAS ROOFING SPECIALISTS</div>
          <h1>A stronger roof.<br/><em>A safer home.</em></h1>
          <p>Roofing done right, from the first inspection to the final shingle. Honest recommendations, quality materials and a team that shows up.</p>
          <div className="hero-actions"><a href="#estimate" className="btn btn-orange">Request an Estimate <ArrowUpRight size={17}/></a><a href="#services" className="text-link">Explore our services <ChevronRight size={16}/></a></div>
          <div className="hero-proof"><div className="avatar-stack"><i>J</i><i>M</i><i>A</i><i>+</i></div><div><div className="stars">★★★★★</div><small>Trusted by homeowners across Central Texas</small></div></div>
        </div>
        <div className="hero-note"><strong>Built for Texas weather.</strong><span>Wind • Hail • Heat • Heavy rain</span></div>
      </section>

      <section className="trust-strip"><div><strong>15+</strong><span>Years of experience</span></div><div><strong>2,400+</strong><span>Roofs inspected</span></div><div><strong>4.9/5</strong><span>Customer satisfaction</span></div><div><strong>100%</strong><span>Clean-site promise</span></div></section>

      <section className="section services" id="services">
        <div className="section-head"><div><div className="eyebrow dark-eye">WHAT WE DO</div><h2>Everything your roof needs.<br/><em>Nothing it doesn't.</em></h2></div><p>From a small leak to a full replacement, we make the process straightforward and keep you informed at every step.</p></div>
        <div className="service-grid">{services.map(s=><article className="service-card" key={s.n} onMouseEnter={()=>viewService(s.title)}><div className="service-icon">{s.icon}</div><small>{s.n} / SERVICE</small><h3>{s.title}</h3><p>{s.desc}</p><a href="#estimate" onClick={()=>viewService(s.title)}>Talk to a specialist <ArrowUpRight size={15}/></a></article>)}</div>
      </section>

      <section className="split-section" id="process">
        <div className="split-image"><div className="image-caption"><span>THE SUMMIT STANDARD</span><strong>Quality you can see.<br/>Protection you can feel.</strong></div></div>
        <div className="split-copy"><div className="eyebrow dark-eye">A BETTER ROOFING EXPERIENCE</div><h2>Clear answers.<br/><em>Solid work.</em></h2><p>We believe homeowners deserve more than a quick quote. Our team explains what we find, shows you the options and documents the work from start to finish.</p><ul><li><Check/> Detailed photo inspections</li><li><Check/> Upfront scopes and clear pricing</li><li><Check/> Quality materials and workmanship</li><li><Check/> Thorough cleanup and final walkthrough</li></ul><a className="btn btn-dark" href="#estimate">Meet your roofing team <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="section plans" id="pricing">
        <div className="section-head"><div><div className="eyebrow dark-eye">SIMPLE STARTING OPTIONS</div><h2>Good work starts<br/><em>with a clear plan.</em></h2></div><p>Choose a starting point. Final project pricing is confirmed in a written scope after the inspection.</p></div>
        <div className="plan-grid">{plans.map(p=><article className="plan-card" key={p.key}><span className="plan-tag">{p.tag}</span><h3>{p.name}</h3><div className="plan-price">{p.price}<small> USD</small></div><p>{p.detail}</p><button className="btn btn-dark full" onClick={()=>openPlan(p)}>Continue to secure checkout <ArrowUpRight size={15}/></button><small className="secure"><ShieldCheck size={13}/> Secure payment powered by Whop</small></article>)}</div>
        <p className="plan-disclaimer">Project deposit is credited toward the approved project total. Final balance is invoiced after the agreed work is completed. Terms are confirmed in the signed estimate.</p>
      </section>

      <section className="financing"><div><div className="eyebrow">FLEXIBLE PAYMENT OPTIONS</div><h2>Make room for<br/><em>peace of mind.</em></h2><p>Ask about available financing options at checkout. Payment methods and installment offers depend on merchant approval, buyer eligibility and location.</p></div><a href="#estimate" className="btn btn-orange">Ask about financing <ArrowUpRight size={17}/></a></section>

      <section className="section areas" id="areas"><div className="area-copy"><div className="eyebrow dark-eye">PROUDLY LOCAL</div><h2>Rooted here.<br/><em>Ready to help.</em></h2><p>Serving homeowners throughout the greater Austin area and surrounding communities.</p><a href="#estimate" className="text-link dark-link">Check your address <ArrowUpRight size={16}/></a></div><div className="area-list">{areas.map(a=><div key={a}><MapPin size={16}/>{a}</div>)}</div></section>

      <section className="reviews" id="reviews"><div className="eyebrow">HOMEOWNER STORIES</div><h2>Good roofs. Great neighbors.</h2><div className="review-grid"><blockquote><div className="stars">★★★★★</div><p>“The crew was on time, explained every step and left our yard spotless. The new roof looks fantastic.”</p><footer>— Sample customer review <small>Replace with verified review before publishing</small></footer></blockquote><blockquote><div className="stars">★★★★★</div><p>“They found the leak quickly and gave us photos and options instead of pushing a full replacement.”</p><footer>— Sample customer review <small>Replace with verified review before publishing</small></footer></blockquote></div></section>

      <section className="section estimate" id="estimate">
        <div className="estimate-copy"><div className="eyebrow dark-eye">LET'S TAKE A LOOK</div><h2>Your roof deserves<br/><em>a closer look.</em></h2><p>Tell us a little about your project. A roofing specialist will follow up to discuss next steps and arrange a convenient inspection.</p><div className="contact-row"><Phone/><div><small>CALL OUR TEAM</small><strong>(512) 555-0184</strong></div></div><div className="contact-row"><Clock3/><div><small>OFFICE HOURS</small><strong>Mon–Sat, 8am–6pm</strong></div></div></div>
        <form className="estimate-form" onSubmit={submitEstimate}><h3>Request an Estimate</h3><p>We'll be in touch soon.</p><div className="form-row"><label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Email address<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label></div><div className="form-row"><label>Phone number<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(555) 555-5555"/></label><label>ZIP code<input required value={form.zip} onChange={e=>setForm({...form,zip:e.target.value})} placeholder="78701"/></label></div><label>What do you need?<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>Roof inspection</option><option>Roof repair</option><option>Roof replacement</option><option>Storm damage</option><option>Other</option></select></label><label>Tell us about the project<textarea rows="3" value={form.details} onChange={e=>setForm({...form,details:e.target.value})} placeholder="Any leaks, damage, or timing details?"/></label><button className="btn btn-orange full" disabled={loading}>{loading?"Sending...":"Send estimate request"} <ArrowUpRight size={16}/></button>{status&&<div className="form-status" role="status">{status}</div>}<small className="privacy">By submitting, you agree that Summit Roofing Co. may contact you about this request.</small></form>
      </section>
    </main>

    <footer className="footer"><div className="brand footer-brand"><span className="brand-mark">S</span><span>SUMMIT<span className="brand-sub">ROOFING CO.</span></span></div><p>Built to weather every season.</p><span>© {new Date().getFullYear()} Summit Roofing Co. All rights reserved.</span></footer>
    {checkout&&<div className="modal-backdrop" onClick={()=>setCheckout(null)}><div onClick={e=>e.stopPropagation()}><CheckoutPanel planId={checkout.planId} title={checkout.name} onClose={()=>setCheckout(null)}/></div></div>}
  </div>;
}