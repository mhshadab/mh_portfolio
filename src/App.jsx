import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0c0c0c",
  surface: "#141414",
  text: "#e8e4de",
  muted: "#7a756d",
  accent: "#c8a97e",
  accentDim: "#c8a97e22",
  accentMid: "#c8a97e44",
  border: "#2a2620",
  borderLight: "#3a3530",
  gold: "#eab308",
  mono: "'DM Mono', monospace",
  body: "'Sora', sans-serif",
};

const techLogos = {
  "Azure Databricks":"https://cdn.simpleicons.org/databricks/FF3621",
  PySpark:"https://cdn.simpleicons.org/apachespark/E25A1C",
  "Delta Lake":"https://cdn.simpleicons.org/delta/003366",
  "Apache Kafka":"https://cdn.simpleicons.org/apachekafka/231F20",
  "Apache Airflow":"https://cdn.simpleicons.org/apacheairflow/017CEE",
  Python:"https://cdn.simpleicons.org/python/3776AB",
  TensorFlow:"https://cdn.simpleicons.org/tensorflow/FF6F00",
  Docker:"https://cdn.simpleicons.org/docker/2496ED",
  Terraform:"https://cdn.simpleicons.org/terraform/844FBA",
  "GitHub Actions":"https://cdn.simpleicons.org/githubactions/2088FF",
  "Azure DevOps":"https://cdn.simpleicons.org/azuredevops/0078D7",
  Azure:"https://cdn.simpleicons.org/microsoftazure/0078D4",
  AWS:"https://cdn.simpleicons.org/amazonaws/232F3E",
  "scikit-learn":"https://cdn.simpleicons.org/scikitlearn/F7931E",
  MLflow:"https://cdn.simpleicons.org/mlflow/0194E2",
  OpenAI:"https://cdn.simpleicons.org/openai/412991",
  Git:"https://cdn.simpleicons.org/git/F05032",
  MySQL:"https://cdn.simpleicons.org/mysql/4479A1",
  Excel:"https://cdn.simpleicons.org/microsoftexcel/217346",
};

function Anim({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(22px)", transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function Chip({ children }) {
  return <span style={{ fontFamily:C.mono,fontSize:11,padding:"4px 10px",borderRadius:4,background:C.accentDim,color:C.accent,border:`1px solid ${C.accentMid}` }}>{children}</span>;
}

function TechPill({ name }) {
  const logo = techLogos[name];
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:500,padding:"3px 8px",borderRadius:4,background:C.bg,color:C.muted,border:`1px solid ${C.border}` }}>
      {logo && <img src={logo} alt="" width="12" height="12" style={{borderRadius:2}}/>}
      {name}
    </span>
  );
}

function StackItem({ name }) {
  const logo = techLogos[name];
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"8px 14px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontWeight:500,color:C.text }}>
      {logo && <img src={logo} alt="" width="15" height="15" style={{borderRadius:2}}/>}
      {name}
    </span>
  );
}

function Arrow({ open }) {
  return <span style={{ display:"inline-block",transition:"transform 0.3s",transform:open?"rotate(90deg)":"rotate(0deg)",color:C.accent,fontSize:13 }}>▸</span>;
}

function Toggle({ label, open, onClick, children }) {
  return (
    <>
      <button onClick={onClick} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:C.accent,fontSize:13,fontFamily:C.mono,padding:"6px 0" }}>
        <Arrow open={open}/> {open ? "Collapse details" : label}
      </button>
      <div style={{ maxHeight:open?"5000px":"0px",overflow:"hidden",transition:"max-height 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ paddingTop:14,borderTop:`1px solid ${C.border}`,marginTop:10 }}>{children}</div>
      </div>
    </>
  );
}

function DetailList({ items }) {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      {items.map((item,i) => (
        <div key={i} style={{ fontSize:13.5,color:C.text,paddingLeft:16,position:"relative",lineHeight:1.7 }}>
          <span style={{ position:"absolute",left:0,color:C.accent,fontSize:12 }}>›</span>{item}
        </div>
      ))}
    </div>
  );
}

function LinkBtn({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{
      display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:6,
      background:C.accentDim,border:`1px solid ${C.accentMid}`,color:C.accent,fontSize:12,fontFamily:C.mono,
    }}>{icon} {label} <span style={{fontSize:11,opacity:0.6}}>↗</span></a>
  );
}

const GH = <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const DP = <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.744h3.824c3.534 0 5.872 2.268 5.872 5.65 0 3.382-2.338 5.65-5.872 5.65H7.595V6.354zm2.985 2.61v6.08h.84c1.826 0 2.886-1.222 2.886-3.04s-1.06-3.04-2.886-3.04h-.84z"/></svg>;

/* ═══════════════════════════════════════ */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [expOpen, setExpOpen] = useState({});
  const [projOpen, setProjOpen] = useState({ canada: true });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const toggleExp = (k) => setExpOpen(p=>({...p,[k]:!p[k]}));
  const toggleProj = (k) => setProjOpen(p=>({...p,[k]:!p[k]}));

  useEffect(() => {
    const h = () => {
      for (const s of ["home","experience","projects","stack","education","contact"]) {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); if (r.top<=100&&r.bottom>100) { setActiveSection(s); break; } }
      }
    };
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  }, []);

  const W = { maxWidth:1100, margin:"0 auto", padding:"0 48px" };

  return (
    <div style={{ background:C.bg,color:C.text,minHeight:"100vh",fontFamily:C.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:${C.bg}}
        ::selection{background:${C.accentMid};color:${C.text}}
        a{color:${C.accent};text-decoration:none}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.borderLight};border-radius:3px}
        @keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}30%{transform:translate(3%,-15%)}50%{transform:translate(12%,9%)}70%{transform:translate(9%,4%)}90%{transform:translate(-1%,7%)}}
      `}</style>

      <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",background:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,pointerEvents:"none",zIndex:1000,opacity:0.5,animation:"grain 8s steps(10) infinite" }}/>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:C.bg+"ee",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}` }}>
        <div style={{ ...W,height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ fontFamily:C.mono,fontSize:14,color:C.accent,letterSpacing:"0.1em",fontWeight:500 }}>MHS</div>
          <div style={{ display:"flex",gap:28 }}>
            {["home","experience","projects","stack","education","contact"].map(s=>(
              <span key={s} onClick={()=>scrollTo(s)} style={{ fontSize:12,fontFamily:C.mono,color:activeSection===s?C.accent:C.muted,cursor:"pointer",letterSpacing:"0.05em",borderBottom:activeSection===s?`1px solid ${C.accent}`:"1px solid transparent",paddingBottom:2 }}>{s.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO — two column */}
      <section id="home" style={{ minHeight:"100vh",display:"flex",alignItems:"center" }}>
        <div style={{ ...W,display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
          <div>
            <Anim>
              <div style={{ fontFamily:C.mono,fontSize:13,color:C.accent,marginBottom:20,letterSpacing:"0.15em" }}>DATA ENGINEER · ML DEVELOPER · ANALYTICS</div>
            </Anim>
            <Anim delay={150}>
              <h1 style={{ fontSize:52,fontWeight:700,lineHeight:1.1,marginBottom:24,background:`linear-gradient(135deg,${C.text},${C.muted})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                Muhtasim Haque<br/>Shadab
              </h1>
            </Anim>
            <Anim delay={300}>
              <p style={{ fontSize:16,color:C.muted,lineHeight:1.75,marginBottom:20 }}>
                I architect data platforms that move companies from scattered spreadsheets to real-time intelligence — building lakehouses, ML pipelines, and analytics systems that turn raw data into decisions people trust.
              </p>
            </Anim>
            <Anim delay={400}>
              <div style={{ display:"flex",gap:16,marginTop:24 }}>
                <a href="https://linkedin.com/in/mh-shadab" target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",border:`1px solid ${C.accent}`,borderRadius:8,color:C.accent,fontSize:13,fontFamily:C.mono,letterSpacing:"0.05em" }}>LinkedIn ↗</a>
                <a href="https://github.com/mh-shadab" target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:13,fontFamily:C.mono,letterSpacing:"0.05em" }}>GitHub ↗</a>
              </div>
            </Anim>
          </div>
          <Anim delay={600}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              {[
                ["3+","Years Experience"],
                ["B.Sc.","Computer Engineering"],
                ["M.Sc.","Computer Science"],
                ["Alberta","Canada"],
              ].map(([big,small],i) => (
                <div key={i} style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 18px" }}>
                  <div style={{ fontFamily:C.mono,fontSize:24,fontWeight:700,color:C.accent,lineHeight:1 }}>{big}</div>
                  <div style={{ fontSize:12,color:C.muted,marginTop:6 }}>{small}</div>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding:"100px 0" }}>
        <div style={W}>
          <Anim>
            <div style={{ fontFamily:C.mono,fontSize:11,color:C.accent,letterSpacing:"0.15em",marginBottom:8 }}>01</div>
            <h2 style={{ fontSize:36,fontWeight:600,marginBottom:48 }}>Experience</h2>
          </Anim>

          {/* ANC */}
          <Anim delay={100}>
            <div style={{ position:"relative",paddingLeft:32,marginBottom:48 }}>
              <div style={{ position:"absolute",left:0,top:0,bottom:0,width:2,background:C.border }}/>
              <div style={{ position:"absolute",left:-5,top:6,width:12,height:12,borderRadius:"50%",background:C.accent,boxShadow:`0 0 0 4px ${C.bg}, 0 0 0 6px ${C.accentDim}` }}/>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:20,fontWeight:600 }}>Data Analyst <span style={{ fontSize:13,color:C.muted,fontWeight:400 }}>(Data Engineer / ML Engineer scope)</span></div>
                  <div style={{ fontSize:15,color:C.accent,marginTop:4 }}>Alberta Newsprint Company — Whitecourt, AB</div>
                </div>
                <span style={{ fontFamily:C.mono,fontSize:12,color:C.muted,background:C.surface,padding:"4px 10px",borderRadius:4,whiteSpace:"nowrap" }}>Jul 2024 — Present</span>
              </div>
              <div style={{ fontSize:12,color:C.muted,fontStyle:"italic",marginBottom:12 }}>Paper Manufacturing · ~750 MT/day output</div>
              <p style={{ fontSize:14,color:C.muted,lineHeight:1.75,marginBottom:14 }}>
                When I joined, the company had no centralized data platform. Reports took 4 days to compile, reconciliation consumed 30 hours every month, and production scheduling relied heavily on institutional knowledge. I played a key role in building the data infrastructure from the ground up — a Delta Lakehouse with real-time Kafka streaming, automated ERP integrations, ML models that reduced chemical waste by 16%, and an LLM-powered IT assistant that now serves the entire company's support needs. Today, business users self-serve their own reports in under 10 minutes.
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
                <Chip>40 hrs/wk manual work eliminated</Chip><Chip>30 hrs/mo reconciliation saved</Chip><Chip>4-day → 10-min turnaround</Chip><Chip>16% chemical waste reduction</Chip><Chip>8 Power BI dashboards</Chip>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:14 }}>
                {["Azure Databricks","PySpark","Delta Lake","Apache Kafka","NetSuite","Azure SQL","Azure Key Vault","Docker","n8n","Power BI","Lakeflow Jobs","OpenAI"].map(t=><TechPill key={t} name={t}/>)}
              </div>
              <Toggle label="Read full details" open={!!expOpen.anc} onClick={()=>toggleExp("anc")}>
                <DetailList items={[
                  "Architected a Delta Lakehouse on Azure Databricks with PySpark. Scheduled batch ingestion every 15 minutes for production, sales, and logistics data, stored in Delta Lake with ACID-compliant transactions.",
                  "Set up Apache Kafka for real-time paper creation status streaming and inventory tracking across the full creation-to-inventory lifecycle. Both batch (15-min) and streaming (Kafka) pipelines run simultaneously.",
                  "Built custom SOAP and REST API connectors in PySpark to pull data from NetSuite ERP (customers, items, invoices, shipments). Token-based auth with Delta Lake schema evolution so pipelines never break on ERP updates.",
                  "Designed centralized Gold analytical layer in Azure SQL with stored procedures, optimized views, and data modeling. Cut ad hoc data request turnaround from 4 days to under 10 minutes. Business users now self-serve their own reports.",
                  "Orchestrated pipelines with Databricks Lakeflow Jobs (task dependency chaining, failure alerts). Managed secrets through Azure Key Vault scoped to workspaces. CI/CD via Azure DevOps + GitHub Actions, infrastructure with Terraform, automation with Docker + n8n.",
                  "Built a Python REST API wrapper around WinMops production system to securely expose production data as JSON to internal consumers.",
                  "Trained and deployed a production sequencing ML model on 9 years of sensor data (decision trees + similarity coefficients). Reduced chemical usage by 16% across ~750 MT/day. Live on Databricks with drift detection, A/B version comparisons, and scheduled retraining.",
                  "Built an LLM-powered IT assistant on Microsoft Teams using OpenAI function calling — intent classification and slot-filling for ticket creation (Freshservice), software installs (Immy Bot), and knowledge base lookups. Serves the entire company.",
                  "Built 8 Power BI dashboards with DAX measures, time intelligence, and dynamic KPIs — used in client and partner meetings. Automated reports with Power Automate. Maintained 5 Excel reporting models handling $14M CAD/month across reconciliation, audit prep, and inventory tracking.",
                  "Mentored interns on pipeline development, analytics workflows, and reporting. Work directly with operations, accounting, and management teams.",
                ]}/>
              </Toggle>
            </div>
          </Anim>

          {/* Red Deer */}
          <Anim delay={200}>
            <div style={{ position:"relative",paddingLeft:32,marginBottom:48 }}>
              <div style={{ position:"absolute",left:0,top:0,bottom:0,width:2,background:C.border }}/>
              <div style={{ position:"absolute",left:-5,top:6,width:12,height:12,borderRadius:"50%",background:C.accent,boxShadow:`0 0 0 4px ${C.bg}, 0 0 0 6px ${C.accentDim}` }}/>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:20,fontWeight:600 }}>Software Developer Co-op</div>
                  <div style={{ fontSize:15,color:C.accent,marginTop:4 }}>Red Deer Polytechnic — Energy Innovation Center</div>
                </div>
                <span style={{ fontFamily:C.mono,fontSize:12,color:C.muted,background:C.surface,padding:"4px 10px",borderRadius:4,whiteSpace:"nowrap" }}>Jan 2022 — Sep 2023</span>
              </div>
              <div style={{ fontSize:12,color:C.muted,fontStyle:"italic",marginBottom:12 }}>Renewable Energy · 4,000+ Solar Panels</div>
              <p style={{ fontSize:14,color:C.muted,lineHeight:1.75,marginBottom:14 }}>
                This co-op was special — I got to contribute to something that genuinely matters: pushing solar energy adoption forward. I built the data pipeline and ML models that identified underperforming panels and optimized placement across 4,000+ units. The 35% performance boost gave clients real confidence in the technology, helped the center secure funding for new sites, and left me feeling like I'd made a small but real contribution to the environment through my work.
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
                <Chip>50K+ sensor readings/day</Chip><Chip>35% performance improvement</Chip><Chip>4,000+ panels monitored</Chip>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:14 }}>
                {["Python","Apache Airflow","MySQL","Azure","Power BI"].map(t=><TechPill key={t} name={t}/>)}
              </div>
              <Toggle label="Read full details" open={!!expOpen.rdp} onClick={()=>toggleExp("rdp")}>
                <DetailList items={[
                  "Built an ETL pipeline on Azure VM using Python and Apache Airflow to ingest 50,000+ daily sensor readings from 4,000+ solar panels across multiple sites into MySQL.",
                  "Ran data quality routines (missing value imputation, normalization, outlier detection). Applied K-means clustering with regression analysis to identify underperforming units and optimize placement. 35% performance improvement.",
                  "Built Power BI dashboards with DAX measures and relational data modeling — energy output trends, generation efficiency, and site-level comparisons. Used by site managers for maintenance decisions.",
                  "Developed a Python desktop application for solar device registration, report generation, and performance tracking.",
                ]}/>
              </Toggle>
            </div>
          </Anim>

          {/* TA */}
          <Anim delay={300}>
            <div style={{ position:"relative",paddingLeft:32 }}>
              <div style={{ position:"absolute",left:0,top:0,bottom:0,width:2,background:C.border }}/>
              <div style={{ position:"absolute",left:-5,top:6,width:12,height:12,borderRadius:"50%",background:C.borderLight,boxShadow:`0 0 0 4px ${C.bg}, 0 0 0 6px ${C.border}` }}/>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:20,fontWeight:600 }}>Teaching Assistant — CMPUT 274</div>
                  <div style={{ fontSize:15,color:C.accent,marginTop:4 }}>University of Alberta</div>
                </div>
                <span style={{ fontFamily:C.mono,fontSize:12,color:C.muted,background:C.surface,padding:"4px 10px",borderRadius:4,whiteSpace:"nowrap" }}>Sep 2021 — Dec 2021</span>
              </div>
              <p style={{ fontSize:14,color:C.muted,lineHeight:1.75 }}>
                Helped 150 students work through the fundamentals — Python, algorithms, OOP, Huffman coding, classifiers, debugging, and Git. The kind of course where students either fall in love with programming or decide it's not for them, and my job was to make sure as many as possible landed on the right side of that.
              </p>
            </div>
          </Anim>
        </div>
      </section>

      {/* PROJECTS — two-column split: info left, sidebar right */}
      <section id="projects" style={{ padding:"100px 0" }}>
        <div style={W}>
          <Anim>
            <div style={{ fontFamily:C.mono,fontSize:11,color:C.accent,letterSpacing:"0.15em",marginBottom:8 }}>02</div>
            <h2 style={{ fontSize:36,fontWeight:600,marginBottom:48 }}>Projects</h2>
          </Anim>

          {/* ─── Canada Electronics ─── */}
          <Anim delay={100}>
            <div style={{ marginBottom:64 }}>
              {/* Top row: title + badge */}
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <span style={{ fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:"0.05em" }}>Data Engineer & ML Developer</span>
                <span style={{ fontFamily:C.mono,fontSize:11,padding:"4px 12px",borderRadius:20,background:`${C.accent}18`,color:C.accent,border:`1px solid ${C.accent}35` }}>FEATURED</span>
              </div>
              <h3 style={{ fontSize:28,fontWeight:700,marginBottom:16 }}>Canada Electronics Retail Analytics Platform</h3>

              {/* Two-column: description left, metrics right */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 280px",gap:32,marginBottom:20 }}>
                <div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:14 }}>
                    {["Azure Databricks","Delta Live Tables","Unity Catalog","XGBoost","MLflow","PySpark","Auto Loader","Power BI","Azure Key Vault","Genie AI"].map(t=><TechPill key={t} name={t}/>)}
                  </div>
                  <p style={{ color:C.muted,fontSize:14,lineHeight:1.75,margin:0 }}>
                    Started with a question: can you predict a $3.5B/month market using only publicly available data? I built the entire platform to find out — provisioned the cloud infrastructure, ingested data from 4 government and financial APIs, designed a 39-table Medallion architecture, trained an XGBoost model that forecasts within 3.95% accuracy, and wired it all into a 5-page Power BI dashboard and a Genie AI agent that answers business questions in plain English.
                  </p>
                </div>
                {/* Sidebar: metrics + links */}
                <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                    {[["39","Delta Tables"],["3.95%","MAPE"],["46","ML Features"],["5","BI Pages"]].map(([v,l],i) => (
                      <div key={i} style={{ background:C.surface,borderRadius:8,padding:"14px 10px",textAlign:"center",border:`1px solid ${C.border}` }}>
                        <div style={{ fontFamily:C.mono,fontSize:20,fontWeight:700,color:C.accent }}>{v}</div>
                        <div style={{ fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginTop:3 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <LinkBtn href="https://github.com/mh-shadab" label="GitHub" icon={GH}/>
                </div>
              </div>

              <Toggle label="Read full architecture + details" open={!!projOpen.canada} onClick={()=>toggleProj("canada")}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:28 }}>
                  {[
                    { h:"INFRASTRUCTURE", items:[
                      "Provisioned Azure Blob Storage containers and configured Unity Catalog metastore with three-level namespace (catalog.schema.table).",
                      "Set up Delta Live Tables pipelines with scheduled daily ingestion jobs. Power BI dashboards auto-refresh from a live Databricks SQL Warehouse.",
                    ]},
                    { h:"4 EXTERNAL DATA SOURCES", items:[
                      "FRED: 15 macro-economic series via REST API with Azure Key Vault.",
                      "Statistics Canada: Retail sales, inventory, imports via CSV API.",
                      "Google Trends: 4 search keywords via pytrends.",
                      "World Bank WITS: Tariff rates via SDMX/XML REST API.",
                      "Watermark-based incremental ingestion (23 tracked combos).",
                    ]},
                    { h:"MEDALLION ARCHITECTURE (39 TABLES)", items:[
                      "Bronze (6): Raw payloads via Auto Loader. Change Data Feed + Row Tracking on streaming tables.",
                      "Silver (14): Quarantine-based validation, 36,544 bad records isolated. Quality metrics per source.",
                      "Gold (19): Rolling stats, YoY changes, volatility, inventory health, and a unified 46-column ML training dataset.",
                    ]},
                    { h:"DATA TRANSFORMATION", items:[
                      "Type casting, date parsing, schema standardization, deduplication, pivoting.",
                      "Rolling aggregations (3M/6M/12M), window functions (LAG, MoM%, YoY%), semi-structured parsing (XML, JSON).",
                      "Feature engineering: lag features, interaction terms, cyclical month_sin/cos, business logic encoding.",
                    ]},
                    { h:"ML MODEL — XGBOOST", items:[
                      "14 features selected from 46. Top: PPI Electronics (0.52), 1-month lag (0.19), Fed Funds (0.09).",
                      "MAPE: 3.95%, Avg Bias: -3.95%, Max Error: 7.38%, CV MAPE: 4.60%.",
                      "v1 vs v2 comparison: v2 overfitted. Deployed on Databricks with MLflow tracking.",
                    ]},
                    { h:"POWER BI (5 PAGES)", items:[
                      "Executive Summary: KPI cards, demand trend, inventory gauge.",
                      "Demand Signal: Sentiment vs demand, search trends, retail sales.",
                      "Supply Health: Inventory ratio with zone shading, imports.",
                      "Cost Pressure: FX, oil, tariffs with moving averages.",
                      "ML Performance: Forecast, MAPE, actual vs predicted, error breakdown.",
                    ]},
                  ].map((section,si) => (
                    <div key={si} style={{ marginBottom:8 }}>
                      <div style={{ fontSize:11,color:C.accent,fontFamily:C.mono,letterSpacing:"0.1em",marginBottom:8 }}>{section.h}</div>
                      <DetailList items={section.items}/>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:20 }}>
                  <div style={{ fontSize:11,color:C.accent,fontFamily:C.mono,letterSpacing:"0.1em",marginBottom:8 }}>GENIE AI AGENT</div>
                  <DetailList items={[
                    "All 19 Gold tables as data sources with custom instructions: business context, caveats, formatting, table routing, JOIN rules.",
                    "8 sample SQL queries covering sales, forecasts, accuracy, inventory, macro indicators, tariffs, and feature importance.",
                  ]}/>
                </div>
                <div style={{ marginTop:20,padding:20,background:C.surface,border:`1px dashed ${C.accentMid}`,borderRadius:8,textAlign:"center" }}>
                  <div style={{ fontSize:11,color:C.accent,fontFamily:C.mono,letterSpacing:"0.1em",marginBottom:8 }}>POWER BI DASHBOARD EMBED</div>
                  <p style={{ fontSize:13,color:C.muted }}>Replace the src below with your Publish-to-Web embed URL.</p>
                  <code style={{ fontSize:11,color:C.muted,fontFamily:C.mono }}>{`<iframe src="YOUR_POWERBI_EMBED_URL" ...>`}</code>
                </div>
              </Toggle>

              {/* Bottom divider */}
              <div style={{ marginTop:40,height:1,background:`linear-gradient(90deg, ${C.accent}40, ${C.border}, transparent)` }}/>
            </div>
          </Anim>

          {/* ─── Food Spoilage + EpilepSafe side by side ─── */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }}>

            {/* Food Spoilage */}
            <Anim delay={200}>
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <span style={{ fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:"0.05em" }}>Feb 2024</span>
                  <span style={{ fontFamily:C.mono,fontSize:10,padding:"3px 10px",borderRadius:20,background:`${C.accent}15`,color:C.accent,border:`1px solid ${C.accent}30` }}>HACKATHON · ML</span>
                </div>
                <h3 style={{ fontSize:22,fontWeight:600,marginBottom:10 }}>Food Spoilage Detection — SafeFood</h3>
                <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:12 }}>
                  {["TensorFlow","MobileNetV2","PyQt5","Data Augmentation"].map(t=><TechPill key={t} name={t}/>)}
                </div>
                <p style={{ color:C.muted,fontSize:13,lineHeight:1.75,marginBottom:14 }}>
                  The idea started simple: food goes bad in the fridge and nobody notices until it's too late. Meat leaks onto vegetables, leftovers get pushed to the back, and perfectly good groceries end up in the trash. We built SafeFood to solve that — point a camera at your food and get an instant classification: Good, Starting to Spoil, or Rotten. Under the hood, it's a MobileNetV2 transfer learning model with heavy data augmentation, packaged into a PyQt5 desktop app for on-device inference with no API calls needed.
                </p>
                <div style={{ display:"flex",gap:10,marginBottom:12 }}>
                  <LinkBtn href="https://github.com/mhshadab/Food-Spoilage-Detector" label="GitHub" icon={GH}/>
                </div>
                <Toggle label="Read full details" open={!!projOpen.food} onClick={()=>toggleProj("food")}>
                  {[
                    { h:"THE PROBLEM", items:[
                      "Food spoilage is a silent budget killer. Meat contaminating nearby items, forgotten leftovers, hundreds of dollars wasted yearly.",
                      "Existing solutions are too expensive (smart fridges) or too manual (sniff-testing). We wanted something instant and free.",
                    ]},
                    { h:"ML ARCHITECTURE", items:[
                      "MobileNetV2 (ImageNet) with custom layers: GlobalAveragePooling2D → Dense(1024, ReLU) → Dense(3, Softmax).",
                      "Heavy augmentation: rotation 40°, shifts 20%, shear, zoom, flips. Adam optimizer, lr=0.0001, 10 epochs.",
                      "Model saved as veggie_spoilage_predictor.h5 for portable deployment.",
                    ]},
                    { h:"DESKTOP APP", items:[
                      "PyQt5 GUI with image upload, real-time prediction, and scaled preview. Fully on-device, no API calls.",
                    ]},
                  ].map((section,si) => (
                    <div key={si} style={{ marginBottom:16 }}>
                      <div style={{ fontSize:11,color:C.accent,fontFamily:C.mono,letterSpacing:"0.1em",marginBottom:8 }}>{section.h}</div>
                      <DetailList items={section.items}/>
                    </div>
                  ))}
                </Toggle>
              </div>
            </Anim>

            {/* EpilepSafe */}
            <Anim delay={300}>
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <span style={{ fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:"0.05em" }}>Nov 2020</span>
                  <span style={{ fontFamily:C.mono,fontSize:10,padding:"3px 10px",borderRadius:20,background:"rgba(234,179,8,0.1)",color:"#eab308",border:"1px solid rgba(234,179,8,0.3)" }}>🏆 1ST PLACE</span>
                </div>
                <h3 style={{ fontSize:22,fontWeight:600,marginBottom:10 }}>EpilepSafe — HackED Beta Winner</h3>
                <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:12 }}>
                  {["Python","OpenCV","Signal Processing","Spectral Filtering","pytube"].map(t=><TechPill key={t} name={t}/>)}
                </div>
                <p style={{ color:C.muted,fontSize:13,lineHeight:1.75,marginBottom:14 }}>
                  In 1997, a Pokémon episode with rapid red and blue flashes sent 685 children in Japan to the hospital with epileptic seizures. That story stuck with us. People with epilepsy still don't have a reliable way to pre-screen videos before watching them. We built EpilepSafe to fix that — scan any video, set your sensitivity level, and the tool flags every dangerous time range by analyzing RGB oscillations across 5–30 Hz. Won 1st place at HackED Beta 2020.
                </p>
                <div style={{ display:"flex",gap:10,marginBottom:12 }}>
                  <LinkBtn href="https://devpost.com/software/epilepsafe" label="Devpost" icon={DP}/>
                </div>
                <Toggle label="Read full details" open={!!projOpen.epilep} onClick={()=>toggleProj("epilep")}>
                  {[
                    { h:"WHY WE BUILT THIS", items:[
                      "Flash warnings on platforms are inconsistent. We wanted proactive screening with exact time ranges to skip.",
                      "Won 1st place (prizes: Arduino Kits, Bluetooth Headphones, Amazon Echo).",
                    ]},
                    { h:"HOW IT WORKS", items:[
                      "Sensitivity input (1–3), YouTube URL or local file. Videos chunked into 1-second segments with pixel sampling.",
                      "Scans 5–30 Hz for RGB oscillations — pinpoints flashing, not simple frame changes. Outputs risk-rated time ranges.",
                    ]},
                    { h:"MY CONTRIBUTION", items:[
                      "Rating algorithm, timestamp assessment system, and part of the video segmentation system.",
                    ]},
                  ].map((section,si) => (
                    <div key={si} style={{ marginBottom:16 }}>
                      <div style={{ fontSize:11,color:C.accent,fontFamily:C.mono,letterSpacing:"0.1em",marginBottom:8 }}>{section.h}</div>
                      <DetailList items={section.items}/>
                    </div>
                  ))}
                </Toggle>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* TECH STACK — 2 column */}
      <section id="stack" style={{ padding:"100px 0" }}>
        <div style={W}>
          <Anim>
            <div style={{ fontFamily:C.mono,fontSize:11,color:C.accent,letterSpacing:"0.15em",marginBottom:8 }}>03</div>
            <h2 style={{ fontSize:36,fontWeight:600,marginBottom:48 }}>Tech Stack</h2>
          </Anim>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:36 }}>
            {Object.entries({
              "Data Engineering": ["Azure Databricks","PySpark","Delta Lake","Delta Live Tables","Apache Kafka","Apache Airflow","Unity Catalog","Auto Loader","Lakeflow Jobs","Medallion Architecture","Schema Evolution","Data Lineage"],
              "Cloud & DevOps": ["Azure","AWS","Docker","Terraform","GitHub Actions","Azure DevOps","Azure Key Vault","Azure SQL","Azure Blob Storage","CI/CD"],
              "Programming & Data": ["Python","SQL","Spark SQL","REST APIs","SOAP APIs","Git","MySQL","DAX"],
              "Machine Learning": ["scikit-learn","XGBoost","MLflow","TensorFlow","OpenAI","Feature Engineering","A/B Testing","Data Augmentation"],
              "BI & Reporting": ["Power BI","Excel","Power Automate","Data Modeling"],
            }).map(([cat,items],i) => (
              <Anim key={i} delay={i*80}>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:"1px",textTransform:"uppercase",marginBottom:14,paddingBottom:8,borderBottom:`1px solid ${C.border}` }}>{cat}</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {items.map(item=><StackItem key={item} name={item}/>)}
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding:"100px 0" }}>
        <div style={W}>
          <Anim>
            <div style={{ fontFamily:C.mono,fontSize:11,color:C.accent,letterSpacing:"0.15em",marginBottom:8 }}>04</div>
            <h2 style={{ fontSize:36,fontWeight:600,marginBottom:36 }}>Education & Leadership</h2>
          </Anim>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24 }}>
            {[{d:"M.Sc. Computer Science",s:"University of Alberta"},{d:"B.Sc. Computer Engineering",s:"University of Alberta"}].map((e,i)=>(
              <Anim key={i} delay={i*100}>
                <div style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:20 }}>
                  <div style={{ fontSize:16,fontWeight:600 }}>{e.d}</div>
                  <div style={{ fontSize:13,color:C.accent,marginTop:4 }}>{e.s}</div>
                </div>
              </Anim>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {[{r:"Marketing Director",o:"TEDxUAlberta",p:"2020 — 2021"},{r:"Director of Public Speaking",o:"Engineering Students' Society, UAlberta",p:"2020 — 2021"}].map((l,i)=>(
              <Anim key={i} delay={i*100}>
                <div style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:20 }}>
                  <div style={{ fontSize:14,fontWeight:600 }}>{l.r}</div>
                  <div style={{ fontSize:13,color:C.accent,marginTop:2 }}>{l.o}</div>
                  <div style={{ fontSize:11,color:C.muted,fontFamily:C.mono,marginTop:4 }}>{l.p}</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"100px 0 60px" }}>
        <div style={W}>
          <Anim>
            <div style={{ fontFamily:C.mono,fontSize:11,color:C.accent,letterSpacing:"0.15em",marginBottom:8 }}>05</div>
            <h2 style={{ fontSize:36,fontWeight:600,marginBottom:24 }}>Get In Touch</h2>
            <p style={{ fontSize:16,color:C.muted,lineHeight:1.7,marginBottom:32 }}>
              Open to Data Engineer, ML Engineer, and Analytics Engineering roles. Currently based in Alberta, Canada.
            </p>
            <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
              <a href="mailto:shadab@ualberta.ca" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",background:C.accent,color:C.bg,borderRadius:8,fontSize:13,fontFamily:C.mono,fontWeight:500,letterSpacing:"0.05em" }}>shadab@ualberta.ca</a>
              <a href="tel:780-707-3944" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:13,fontFamily:C.mono,letterSpacing:"0.05em" }}>780-707-3944</a>
            </div>
          </Anim>
          <div style={{ marginTop:80,paddingTop:24,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between" }}>
            <div style={{ fontSize:11,color:C.muted,fontFamily:C.mono }}>© 2026 Muhtasim Haque Shadab</div>
            <div style={{ fontSize:11,color:C.muted,fontFamily:C.mono }}>Built with intention</div>
          </div>
        </div>
      </section>
    </div>
  );
}
