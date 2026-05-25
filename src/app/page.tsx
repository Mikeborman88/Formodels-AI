"use client";
import { useState, useEffect, useRef } from "react";

const BOT = "https://t.me/ForModelsAi_bot";
type Lang = "en" | "ru";

const copy = {
  en: {
    nav:[["#features","Features"],["#forwho","For who"],["#agencies","Agencies"]] as [string,string][],
    try:"Try free", lang:"RU", badge:"AI-Powered · Free to start",
    h1:["AI FOR THE","MODELLING","INDUSTRY"] as string[],
    sub:"Typology analysis · Agency verification · Talent search — everything in one Telegram bot.",
    cta1:"Open in Telegram", cta2:"Learn more",
    stats:[["2,000+","Users"],["50+","Agencies"],["30+","Cities"]] as [string,string][],
    ticker:["Typology Analysis","Agency Verification","Talent Search","Contract Review","News Digest","Career Advice"],
    feat_h:"Everything the industry needs",
    feats:[
      ["01","Typology Analysis","Send your photos — AI determines commercial type, editorial potential, and what's missing for agency submission."],
      ["02","Agency Verification","Ask about any agency — instant check against our database. Know who is trusted before signing."],
      ["03","Talent Search","Photographers find models. Models find photographers. Filter by city, level, specialisation."],
      ["04","Contract Review","Paste a clause — AI flags red flags: exclusivity, portfolio fees, suspicious payment terms."],
      ["05","News Digest","Daily digest from Vogue, WWD, Business of Fashion — curated and summarised by AI."],
      ["06","Career Advice","Rates, market differences, how to approach agencies, what photographers look for."],
    ] as [string,string,string][],
    roles_h:"Built for every role",
    roles:[
      ["01","Models","Typology, agency search, portfolio feedback"],
      ["02","Photographers","Connect with models, understand market rates"],
      ["03","Agencies","Access to verified talent database"],
      ["04","Scouts","Find new faces, verify profiles quickly"],
    ] as [string,string,string][],
    ag_label:"Database", ag_h:"Verified agency database",
    ag_sub:"Modelling agencies worldwide — trusted records, scam warnings, market notes.",
    ag_cta:"Search agencies",
    how_h:"Start in 30 seconds",
    steps:[
      ["01","Open the bot","No app to install. Works on your phone right now."],
      ["02","Tell it who you are","Model, photographer, agency — it adapts to your role."],
      ["03","Get real help","Ask anything. The AI knows the industry and answers straight."],
    ] as [string,string,string][],
    fin:["The industry has always run on","connections.","Now on intelligence."] as string[],
    fin_sub:"Free to start. No account needed.", fin_cta:"Start free in Telegram",
    foot:"AI platform for the modelling industry", foot_c:"Contact founder",
    chat:[{u:true,t:"I want to check Elite Model Management Paris"},{u:false,t:"Checking database... 🔍"},{u:false,t:"🟢 Trusted. Top-tier agency. No portfolio fees ✓"}],
  },
  ru: {
    nav:[["#features","Функции"],["#forwho","Для кого"],["#agencies","Агентства"]] as [string,string][],
    try:"Попробовать", lang:"EN", badge:"На базе ИИ · Бесплатно",
    h1:["ИИ ДЛЯ","МОДЕЛЬНОЙ","ИНДУСТРИИ"] as string[],
    sub:"Анализ типажа · Проверка агентств · Поиск талантов — всё в одном Telegram-боте.",
    cta1:"Открыть в Telegram", cta2:"Узнать больше",
    stats:[["2,000+","Пользователей"],["50+","Агентств"],["30+","Городов"]] as [string,string][],
    ticker:["Анализ типажа","Проверка агентств","Поиск талантов","Анализ контракта","Дайджест новостей","Карьерные советы"],
    feat_h:"Всё что нужно индустрии",
    feats:[
      ["01","Анализ типажа","Пришли фото — ИИ определит коммерческий тип, редакционный потенциал и что не хватает."],
      ["02","Проверка агентств","Спроси о любом агентстве — мгновенная проверка по базе."],
      ["03","Поиск талантов","Фотографы находят моделей. Модели находят фотографов. Фильтрация по городу."],
      ["04","Анализ контракта","Вставь пункт — ИИ выявит красные флаги: эксклюзивность, сборы, условия."],
      ["05","Дайджест новостей","Ежедневный дайджест из Vogue, WWD, BoF — отобранный ИИ."],
      ["06","Карьерные советы","Гонорары, рынки, как подходить к агентствам, что ищут фотографы."],
    ] as [string,string,string][],
    roles_h:"Для каждой роли",
    roles:[
      ["01","Модели","Типаж, поиск агентств, обратная связь по портфолио"],
      ["02","Фотографы","Связь с моделями, понимание рыночных ставок"],
      ["03","Агентства","Доступ к базе верифицированных талантов"],
      ["04","Скауты","Поиск новых лиц, проверка профилей"],
    ] as [string,string,string][],
    ag_label:"База данных", ag_h:"Верифицированная база агентств",
    ag_sub:"Модельные агентства по всему миру — проверенные записи, предупреждения о скаме.",
    ag_cta:"Искать агентства",
    how_h:"Начни за 30 секунд",
    steps:[
      ["01","Открой бот","Ничего не нужно устанавливать. Работает прямо сейчас."],
      ["02","Расскажи кто ты","Модель, фотограф, агентство — ИИ адаптируется."],
      ["03","Получи реальную помощь","Задавай любые вопросы. ИИ знает индустрию."],
    ] as [string,string,string][],
    fin:["Индустрия всегда работала","на связях.","Теперь на интеллекте."] as string[],
    fin_sub:"Бесплатно. Без регистрации.", fin_cta:"Начать в Telegram",
    foot:"ИИ-платформа для модельной индустрии", foot_c:"Написать основателю",
    chat:[{u:true,t:"Хочу проверить Elite Model Management Paris"},{u:false,t:"Проверяю базу... 🔍"},{u:false,t:"🟢 Проверено. Топ-агентство. Без сборов ✓"}],
  },
};

const AGENCIES=[
  {city:"New York",flag:"🇺🇸",n:14},{city:"Paris",flag:"🇫🇷",n:12},
  {city:"London",flag:"🇬🇧",n:11},{city:"Milan",flag:"🇮🇹",n:9},
  {city:"Tokyo",flag:"🇯🇵",n:8},{city:"Dubai",flag:"🇦🇪",n:6},
];

/* ── Reveal wrapper ── */
function FadeUp({children,delay=0,style:s}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}) {
  const ref=useRef<HTMLDivElement>(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setTimeout(()=>setV(true),delay);obs.disconnect();}},{threshold:0.08});
    obs.observe(el); return()=>obs.disconnect();
  },[delay]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(22px)",transition:"opacity .7s ease,transform .7s ease",...s}}>{children}</div>;
}

/* ── Typing H1 ── */
function TypingH1({lines}:{lines:string[]}) {
  const [li,setLi]=useState(0);
  const [ci,setCi]=useState(0);
  const [done,setDone]=useState(false);
  const key=lines.join();
  useEffect(()=>{setLi(0);setCi(0);setDone(false);},[key]);
  useEffect(()=>{
    if(done) return;
    const full=lines[li]??"";
    if(ci<full.length){const t=setTimeout(()=>setCi(c=>c+1),40);return()=>clearTimeout(t);}
    if(li<lines.length-1){const t=setTimeout(()=>{setLi(l=>l+1);setCi(0);},160);return()=>clearTimeout(t);}
    setDone(true);
  });
  const hStyle=(bright:boolean):React.CSSProperties=>({
    color:bright?"#f4f2ff":"rgba(200,190,230,0.4)",
    textShadow:bright?"0 2px 40px rgba(180,160,255,0.25),0 0 80px rgba(140,100,255,0.1)":"none",
  });
  return (
    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(60px,11vw,120px)",lineHeight:.93,letterSpacing:"-.01em",marginBottom:28}}>
      {lines.map((line,i)=>(
        <div key={i} style={hStyle(i!==1)}>
          {i<li?line:i===li?<>{line.slice(0,ci)}{!done&&<span style={{animation:"blink .9s step-end infinite",color:"rgba(180,160,255,0.6)",fontWeight:300}}>|</span>}</>:""}
        </div>
      ))}
    </div>
  );
}

/* ── Telegram-style Chat Demo ── */
function ChatDemo({lang}:{lang:string}) {
  const userMsg = lang==="ru" ? "Привет! Чем ты можешь помочь?" : "Hi! What can you help me with?";
  const botMsg  = lang==="ru"
    ? "Привет! Вот чем я могу помочь:\n\n— Проверить любое агентство\n— Проанализировать типаж по фото\n— Найти фотографов и моделей\n— Разобрать пункты контракта\n— Ежедневный дайджест моды\n\nС чего начнём? :)"
    : "Hello! Here is what I can do for you:\n\n— Verify any modeling agency\n— Analyze your typology from photos\n— Find photographers and models\n— Review contract clauses\n— Deliver a daily fashion digest\n\nJust tell me where to start :)";

  type Phase = "idle"|"typing"|"sent"|"dots"|"done";
  const [phase, setPhase] = useState<Phase>("idle");
  const [inputText, setInputText] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [showBot, setShowBot] = useState(false);

  useEffect(()=>{
    setPhase("idle"); setInputText(""); setShowUser(false); setShowDots(false); setShowBot(false);
    let i = 0;
    const t0 = setTimeout(()=>{
      setPhase("typing");
      const iv = setInterval(()=>{
        i++;
        setInputText(userMsg.slice(0,i));
        if(i >= userMsg.length){
          clearInterval(iv);
          setTimeout(()=>{
            setShowUser(true); setInputText(""); setPhase("sent");
            setTimeout(()=>{ setShowDots(true); setPhase("dots");
              setTimeout(()=>{ setShowDots(false); setShowBot(true); setPhase("done"); }, 1900);
            }, 700);
          }, 320);
        }
      }, 42);
    }, 800);
    return () => clearTimeout(t0);
  }, [lang]);

  const t = new Date();
  const ts = t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0");

  return (
    <div style={{borderRadius:16,overflow:"hidden",background:"#1c1f2e",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 28px 72px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.07)"}}>
      {/* TG Header */}
      <div style={{background:"#1c1f2e",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#6c5ce7,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",flexShrink:0}}>AI</div>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>ForModels AI</div>
          <div style={{fontSize:11,color:"#4ade80",marginTop:1}}>● online</div>
        </div>
      </div>
      {/* Messages */}
      <div style={{padding:"12px 10px",display:"flex",flexDirection:"column",gap:6,minHeight:200,background:"#17192a"}}>
        {/* User bubble */}
        <div style={{display:"flex",justifyContent:"flex-end",opacity:showUser?1:0,transform:showUser?"translateY(0)":"translateY(7px)",transition:"opacity .35s ease,transform .35s ease"}}>
          <div style={{maxWidth:"78%",padding:"8px 12px",borderRadius:14,borderBottomRightRadius:4,background:"#5b4fcf",color:"#fff",fontSize:13,lineHeight:1.5}}>
            {userMsg}
            <span style={{fontSize:10,opacity:.5,marginLeft:6,float:"right" as const,marginTop:3}}>{ts}</span>
          </div>
        </div>
        {/* Typing dots */}
        {showDots && (
          <div style={{display:"flex",justifyContent:"flex-start"}}>
            <div style={{display:"flex",alignItems:"center",gap:3,padding:"10px 12px",background:"#252838",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,borderBottomLeftRadius:4,width:48,height:36}}>
              {[0,1,2].map(j=>(
                <span key={j} style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.4)",display:"inline-block",animation:`dotb .9s ease-in-out ${j*.18}s infinite`}}/>
              ))}
            </div>
          </div>
        )}
        {/* Bot bubble */}
        <div style={{display:"flex",justifyContent:"flex-start",opacity:showBot?1:0,transform:showBot?"translateY(0)":"translateY(7px)",transition:"opacity .4s ease,transform .4s ease"}}>
          <div style={{maxWidth:"84%",padding:"8px 12px",borderRadius:14,borderBottomLeftRadius:4,background:"#252838",color:"rgba(255,255,255,0.88)",fontSize:13,lineHeight:1.55,border:"1px solid rgba(255,255,255,0.06)",whiteSpace:"pre-line"}}>
            {botMsg}
            <span style={{fontSize:10,opacity:.4,marginLeft:6,float:"right" as const,marginTop:3}}>{ts}</span>
          </div>
        </div>
      </div>
      {/* Input bar */}
      <div style={{padding:"8px 10px",background:"#1c1f2e",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,background:"#252838",borderRadius:20,padding:"8px 14px",fontSize:13,color:inputText?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.25)",minHeight:34,display:"flex",alignItems:"center",gap:3}}>
          {inputText || <span>Message...</span>}
          {phase==="typing" && <span style={{width:1.5,height:14,background:"rgba(180,160,255,0.8)",display:"inline-block",animation:"blink .85s step-end infinite"}}/>}
        </div>
        <div style={{width:32,height:32,borderRadius:"50%",background:phase==="typing"?"#7c6de0":"#5b4fcf",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s,transform .15s",transform:phase==="sent"?"scale(1.12)":"scale(1)"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ── Shared styles ── */
const S = {
  page:{position:"relative" as const,background:"linear-gradient(160deg,#0f1118 0%,#141720 50%,#0c0e15 100%)",minHeight:"100vh"},
  blob:(top:string,right:string,w:number,color:string):React.CSSProperties=>({position:"fixed",width:w,height:w,top,right,borderRadius:"50%",background:`radial-gradient(circle,${color} 0%,transparent 70%)`,pointerEvents:"none",zIndex:0}),
  section:(pt?:number):React.CSSProperties=>({padding:`${pt??80}px clamp(20px,4vw,56px)`,position:"relative",zIndex:1}),
  inner:{maxWidth:1100,margin:"0 auto"},
  slabel:{display:"inline-block",fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase" as const,color:"rgba(180,160,255,0.6)",marginBottom:14},
  sh:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(30px,5vw,56px)",lineHeight:1.02,color:"#f0eeff",textShadow:"0 2px 24px rgba(180,160,255,0.15)",marginBottom:48},
  btnP:{display:"inline-flex" as const,alignItems:"center",gap:9,background:"rgba(160,130,255,0.18)",color:"rgba(230,220,255,0.95)",border:"1px solid rgba(160,130,255,0.35)",padding:"13px 26px",borderRadius:10,fontSize:14,fontWeight:500,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"all .2s",textShadow:"0 1px 12px rgba(180,160,255,0.4)"},
  btnG:{display:"inline-flex" as const,alignItems:"center",gap:8,background:"transparent",color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.1)",padding:"13px 22px",borderRadius:10,fontSize:14,fontWeight:400,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},
};

export default function Page() {
  const [lang,setLang]=useState<Lang>("en");
  const l=copy[lang];
  const ticker=[...l.ticker,...l.ticker];

  return (
    <>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes dotb{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
        @keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        .feat-cell{padding:28px 24px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);transition:background .2s}
        .feat-cell:hover{background:rgba(255,255,255,0.06)}
        .glass-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;transition:background .25s,border-color .25s,transform .25s}
        .glass-card:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15);transform:translateY(-3px)}
        .ag-card{padding:14px 18px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s}
        .ag-card:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);transform:translateY(-2px)}
        .btn-p:hover{background:rgba(160,130,255,0.28)!important;border-color:rgba(160,130,255,0.5)!important;transform:translateY(-1px);box-shadow:0 8px 32px rgba(140,100,255,0.2)}
        .btn-g-h:hover{border-color:rgba(255,255,255,0.22)!important;color:rgba(255,255,255,0.7)!important}
      `}</style>

      <div style={S.page}>
        {/* Ambient blobs */}
        <div style={S.blob("-200px","-100px",600,"rgba(124,92,252,0.12)")}/>
        <div style={S.blob("auto","auto",500,"rgba(80,160,255,0.08)")} />
        <div style={{...S.blob("40%","35%",400,"rgba(200,180,255,0.05)"),right:"35%"}}/>

        {/* NAV */}
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(13,15,20,0.75)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.06)",height:56,display:"flex",alignItems:"center",padding:"0 clamp(20px,4vw,56px)",justifyContent:"space-between",gap:16}}>
          <a href="#" style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#f0eeff",letterSpacing:".01em"}}>
            ForModels<span style={{color:"rgba(200,180,255,0.5)"}}>.</span>AI
          </a>
          <div style={{display:"flex",gap:24,fontSize:13}}>
            {l.nav.map(([href,label])=>(
              <a key={href} href={href} style={{color:"rgba(255,255,255,0.42)",transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.85)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.42)"}>{label}</a>
            ))}
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <button onClick={()=>setLang(lang==="en"?"ru":"en")} style={{background:"none",border:"none",fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.4)",cursor:"pointer",letterSpacing:".06em"}}>{l.lang}</button>
            <a href={BOT} target="_blank" rel="noopener noreferrer" style={{...S.btnP,padding:"8px 18px",fontSize:13,borderRadius:8}} className="btn-p"><TgIcon/>{l.try}</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{...S.section(72),paddingBottom:80,textAlign:"center"}}>
          <div style={{maxWidth:640,margin:"0 auto"}}>

            <FadeUp delay={100} style={{marginBottom:20}}>
              <span style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(180,160,255,0.1)",border:"1px solid rgba(180,160,255,0.18)",color:"rgba(200,185,255,0.72)",fontSize:10,fontWeight:600,letterSpacing:".07em",textTransform:"uppercase" as const,padding:"5px 14px",borderRadius:100}}>
                <span style={{width:5,height:5,borderRadius:"50%",background:"#a78bfa",animation:"pulse 2s ease-in-out infinite"}}/>
                AI-Powered · Free to start
              </span>
            </FadeUp>

            <FadeUp delay={60}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(32px,5.5vw,58px)",lineHeight:1.1,letterSpacing:"-.01em",color:"#f4f2ff",textShadow:"0 2px 32px rgba(180,160,255,0.18)",marginBottom:16}}>
                Your AI guide in the<br/>
                <span style={{color:"rgba(180,155,255,0.85)"}}>modelling industry</span>
              </h1>
            </FadeUp>

            <FadeUp delay={120} style={{marginBottom:32}}>
              <div style={{display:"flex",flexWrap:"wrap" as const,justifyContent:"center",gap:"8px 20px",maxWidth:480,margin:"0 auto"}}>
                {["Typology analysis","Agency verification","Talent search","Networking"].map((item,i,arr)=>(
                  <span key={item} style={{fontSize:13,color:"rgba(255,255,255,0.34)",fontWeight:400,position:"relative" as const}}>
                    {item}{i<arr.length-1&&<span style={{marginLeft:8,color:"rgba(255,255,255,0.14)"}}>·</span>}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={160} style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" as const,marginBottom:44}}>
              <a href={BOT} target="_blank" rel="noopener noreferrer" style={S.btnP} className="btn-p"><TgIcon/>{l.cta1}</a>
              <a href="#features" style={S.btnG} className="btn-g-h">{l.cta2} →</a>
            </FadeUp>

            <FadeUp delay={200} style={{marginBottom:52}}>
              <div style={{display:"flex",gap:40,justifyContent:"center",paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                {l.stats.map(([n,label])=>(
                  <div key={label}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:30,lineHeight:1,color:"#f0eeff",textShadow:"0 0 28px rgba(180,160,255,0.24)"}}>{n}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.28)",marginTop:4,textTransform:"uppercase" as const,letterSpacing:".06em"}}>{label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={260} style={{maxWidth:360,margin:"0 auto"}}>
              <ChatDemo lang={lang}/>
            </FadeUp>

          </div>
        </section>
        {/* TICKER */}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)",overflow:"hidden",padding:"12px 0",background:"rgba(255,255,255,0.02)",position:"relative",zIndex:1}}>
          <div style={{display:"flex",width:"max-content",animation:"scroll 24s linear infinite"}}>
            {ticker.map((item,i)=>(
              <span key={i} style={{fontSize:11,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",padding:"0 28px",whiteSpace:"nowrap"}}>
                {item} <span style={{color:"rgba(160,130,255,0.4)",marginLeft:8}}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section id="features" style={S.section()}>
          <div style={S.inner}>
            <FadeUp>
              <span style={S.slabel}>Features</span>
              <h2 style={S.sh}>{l.feat_h}</h2>
            </FadeUp>
            <FadeUp>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:1,border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,overflow:"hidden"}}>
                {l.feats.map(([num,title,desc])=>(
                  <div key={num} className="feat-cell">
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(160,130,255,0.4)",marginBottom:16,letterSpacing:".08em"}}>{num}</div>
                    <div style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.82)",marginBottom:8}}>{title}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.36)",lineHeight:1.65}}>{desc}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FOR WHO */}
        <section id="forwho" style={{...S.section(0),paddingTop:0}}>
          <div style={S.inner}>
            <FadeUp><h2 style={S.sh}>{l.roles_h}</h2></FadeUp>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
              {l.roles.map(([num,title,desc],i)=>(
                <FadeUp key={num} delay={i*75}>
                  <div className="glass-card" style={{padding:"26px 22px",height:"100%"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(160,130,255,0.35)",marginBottom:14}}>{num}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:24,color:"rgba(255,255,255,0.82)",marginBottom:8}}>{title}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.36)",lineHeight:1.6}}>{desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* AGENCIES */}
        <section id="agencies" style={{...S.section(0),paddingTop:80}}>
          <div style={{...S.inner,display:"flex",flexDirection:"column",gap:40}}>
            <FadeUp>
              <span style={S.slabel}>{l.ag_label}</span>
              <h2 style={{...S.sh,marginBottom:12}}>{l.ag_h}</h2>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.36)",maxWidth:480,lineHeight:1.75,fontWeight:300,marginBottom:24}}>{l.ag_sub}</p>
              <a href={BOT} target="_blank" rel="noopener noreferrer" style={S.btnP} className="btn-p"><TgIcon/>{l.ag_cta}</a>
            </FadeUp>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10}}>
              {AGENCIES.map((a,i)=>(
                <FadeUp key={a.city} delay={i*55}>
                  <div className="ag-card" onClick={()=>window.open(BOT,"_blank")}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18}}>{a.flag}</span>
                      <span style={{fontSize:13,fontWeight:500,color:"rgba(255,255,255,0.72)"}}>{a.city}</span>
                    </div>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(160,130,255,0.5)"}}>{a.n}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{...S.section(80),paddingTop:80}}>
          <div style={S.inner}>
            <FadeUp><h2 style={S.sh}>{l.how_h}</h2></FadeUp>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:0}}>
              {l.steps.map(([num,title,desc],i)=>(
                <FadeUp key={num} delay={i*90}>
                  <div style={{paddingRight:i<l.steps.length-1?36:0,borderRight:i<l.steps.length-1?"1px solid rgba(255,255,255,0.06)":"none",paddingBottom:16}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:56,lineHeight:1,color:"rgba(255,255,255,0.05)",marginBottom:8}}>{num}</div>
                    <div style={{fontSize:17,fontWeight:600,color:"rgba(255,255,255,0.78)",marginBottom:8}}>{title}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.36)",lineHeight:1.65}}>{desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{...S.section(100),paddingBottom:100,background:"rgba(255,255,255,0.02)",borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
          <FadeUp style={{maxWidth:900,margin:"0 auto"}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(44px,9vw,96px)",lineHeight:.95,marginBottom:20}}>
              <span style={{color:"#f4f2ff",textShadow:"0 2px 48px rgba(180,160,255,0.3)"}}>{l.fin[0]}<br/></span>
              <span style={{color:"rgba(200,190,230,0.25)"}}>{l.fin[1]}<br/></span>
              <span style={{color:"#f4f2ff",textShadow:"0 2px 48px rgba(180,160,255,0.3)"}}>{l.fin[2]}</span>
            </h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,0.3)",marginBottom:40,fontWeight:300}}>{l.fin_sub}</p>
            <a href={BOT} target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(160,130,255,0.2)",color:"rgba(230,220,255,0.95)",border:"1px solid rgba(160,130,255,0.4)",padding:"16px 40px",borderRadius:12,fontSize:15,fontWeight:600,textShadow:"0 1px 12px rgba(180,160,255,0.4)",transition:"all .2s"}}
              className="btn-p">
              <TgIcon/>{l.fin_cta}
            </a>
          </FadeUp>
        </section>

        {/* FOOTER */}
        <footer style={{padding:"20px clamp(20px,4vw,56px)",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:12,position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:"rgba(255,255,255,0.65)"}}>
            ForModels<span style={{opacity:.4}}>.AI</span>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:400,color:"rgba(255,255,255,0.25)",marginLeft:10,fontSize:12}}>{l.foot}</span>
          </div>
          <div style={{display:"flex",gap:20,fontSize:12}}>
            {[["https://t.me/mike_borman",`${l.foot_c}: @mike_borman`],[BOT,"Telegram Bot ↗"]].map(([href,label])=>(
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,0.3)",transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>{label}</a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
