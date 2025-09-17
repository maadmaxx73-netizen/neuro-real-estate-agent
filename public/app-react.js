import React, { useEffect, useMemo, useRef, useState } from "react";

// Self-contained visual preview of the AI Cory widget with the Philadelphia landing layout.
// Tailwind is available in canvas. No external deps.

export default function NeuroRealEstateAgentPreviewPhilly() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { who: "bot", text: "Hello! I'm your Neuro AI Real Estate Assistant for Philadelphia homes. How can I help you today? 😊" },
  ]);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [msgs, chatOpen]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { who: "user", text }]);
    setInput("");
    setTimeout(() => {
      const l = text.toLowerCase();
      const reply = l.includes("afford") || l.includes("budget")
        ? "Let's estimate affordability. Share income, debts, down payment, and rate — or use the calculator below!"
        : l.includes("agent") || l.includes("realtor")
        ? "I'll match you with a top Philly agent. Buying or selling, and which neighborhood?"
        : l.includes("fsbo")
        ? "FSBO? I can guide you through creating a professional listing that syndicates widely."
        : l.includes("pre-approv") || l.includes("mortgage")
        ? "I can start pre-approval with partner lenders. Ready to begin?"
        : "I can connect you with agents, estimate affordability, start pre-approval, or help FSBO. How can I assist?";
      setMsgs((m) => [...m, { who: "bot", text: reply }]);
    }, 500);
  }

  // Demo recommendations
  const recs = useMemo(
    () => [
      { id: 1, title: "Serene 3BR Townhome", sub: "Bluebell Grove · 1,950 sq ft · $529k", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop" },
      { id: 2, title: "Modern Light‑Filled Condo", sub: "Maple Park · 1,120 sq ft · $389k", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c3f5?q=80&w=1200&auto=format&fit=crop" },
      { id: 3, title: "Family‑Friendly Craftsman", sub: "Willow Heights · 2,450 sq ft · $645k", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop" },
    ],
    []
  );

  // Affordability calc (front-end only)
  const [income, setIncome] = useState(100000);
  const [debts, setDebts] = useState(1500);
  const [downType, setDownType] = useState("percent");
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const affordability = useMemo(() => {
    const maxPmt = (income / 12) * 0.28; // 28% front-end ratio
    const i = rate / 100 / 12;
    const n = term * 12;
    const denom = Math.pow(1 + i, n) - 1;
    const numer = i * Math.pow(1 + i, n);
    const maxLoan = maxPmt / (numer / denom);
    const price = downType === "percent" ? maxLoan / (1 - down / 100) : maxLoan + down;
    return Math.round(price / 1000) * 1000;
  }, [income, debts, downType, down, rate, term]);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900/95 text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="font-bold tracking-tight"><span className="text-sky-400">Neuro</span> Real Estate Agent</div>
          <nav className="hidden gap-6 md:flex">
            {[
              ["Home", "#home"],
              ["Properties", "#properties"],
              ["Top Agents", "#agents"],
              ["Affordability", "#affordability"],
              ["FSBO", "#fsbo"],
              ["Contact", "#contact"],
            ].map(([t, href]) => (
              <a key={t} className="rounded px-3 py-1 text-sm hover:bg-slate-800" href={href}>
                {t}
              </a>
            ))}
          </nav>
          <button onClick={() => setChatOpen(true)} className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-400">
            Chat
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative grid min-h-[60vh] place-items-center overflow-hidden bg-slate-900">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1560518883-ce09eeebdaab?q=80&w=1600&auto=format&fit=crop"
          alt="Philadelphia neighborhood"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">
            Meet <span className="text-sky-400">Cory</span> — your neuro‑aware home concierge
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-200">
            AI‑powered recommendations that match your vibe — calm sanctuary, family energy, or investment growth.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setChatOpen(true)} className="rounded-full bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-400">
              Start Chat Now
            </button>
            <a href="#affordability" className="rounded-full border border-sky-400 px-5 py-2 font-semibold text-sky-300 hover:bg-sky-900/40">
              See How Much You Can Afford
            </a>
          </div>
        </div>
      </section>

      {/* Features + Recs */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold text-slate-800">Why Choose Neuro Real Estate Agent</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["🤝", "Connect With Top Agents", "We match you with the best agents in Philly for your needs."],
            ["💰", "Affordability Calculator", "See how much home you can afford instantly."],
            ["🏦", "Multiple Lenders & Brokers", "Compare competitive rates across lenders."],
            ["✅", "Pre‑Approvals", "Get pre‑approved quickly through trusted partners."],
            ["📞", "Direct Contact", "Message sellers and buyers directly and securely."],
            ["🏡", "For Sale By Owner", "Create standout FSBO listings with AI help."],
          ].map(([icon, title, blurb]) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">{icon}</div>
              <div className="mt-2 font-semibold">{title}</div>
              <div className="mt-1 text-sm text-slate-600">{blurb}</div>
            </div>
          ))}
        </div>

        <div id="properties" className="mt-10">
          <h3 className="text-xl font-semibold">Featured Philadelphia Properties</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recs.map((r) => (
              <div key={r.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <img src={r.img} alt="Home" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="text-sm font-semibold">{r.title}</div>
                  <div className="text-xs text-slate-600">{r.sub}</div>
                  <button className="mt-3 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-400">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-xl font-semibold">Top Real Estate Agents in Philadelphia</h2>
        <p className="mt-1 text-slate-600">We'll connect you with the best agents based on your needs.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "Sarah Johnson", b: "Realty Group Philadelphia", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=60" },
            { n: "Michael Rodriguez", b: "Philadelphia Homes Inc.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=60" },
            { n: "Lisa Chen", b: "Urban Living Realty", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=60" },
            { n: "David Thompson", b: "North Philly Specialists", img: "https://images.unsplash.com/photo-1573497355933-457d327278a4?auto=format&fit=crop&w=1200&q=60" },
          ].map((a) => (
            <div key={a.n} className="overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-slate-200">
              <img src={a.img} alt={a.n} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold">{a.n}</div>
                <div className="text-sm text-slate-600">{a.b}</div>
                <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                  <a className="text-sky-600" href="tel:+12155550123">Call</a>
                  <a className="text-sky-600" href="mailto:agent@example.com">Email</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Affordability */}
      <section id="affordability" className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-xl font-semibold">How Much Home Can You Afford?</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="text-sm">
                Annual Gross Income ($)
                <input type="number" value={income} onChange={(e)=>setIncome(+e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
              </label>
              <label className="text-sm">
                Monthly Debt Payments ($)
                <input type="number" value={debts} onChange={(e)=>setDebts(+e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
              </label>
              <label className="text-sm">
                Down Payment
                <div className="mt-1 flex gap-2">
                  <select value={downType} onChange={(e)=>setDownType(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-2 text-sm">
                    <option value="percent">Percentage (%)</option>
                    <option value="amount">Amount ($)</option>
                  </select>
                  <input type="number" value={down} onChange={(e)=>setDown(+e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
                </div>
              </label>
              <label className="text-sm">
                Estimated Interest Rate (%)
                <input type="number" step="0.1" value={rate} onChange={(e)=>setRate(+e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
              </label>
              <label className="text-sm">
                Loan Term (years)
                <select value={term} onChange={(e)=>setTerm(+e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
                </select>
              </label>
            </div>
            <div className="mt-4 rounded-xl bg-sky-50 p-4 text-center">
              <div className="text-sm text-slate-600">Estimated Maximum Home Price</div>
              <div className="mt-1 text-3xl font-bold text-sky-600">${affordability.toLocaleString()}</div>
              <div className="mt-1 text-xs text-slate-500">Assumes 28% front‑end ratio; demo only.</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="font-semibold">Get Pre‑Approved</div>
            <p className="mt-1 text-sm text-slate-600">Start a quick pre‑approval with partner lenders. No impact to credit for soft pulls.</p>
            <button className="mt-4 w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400">Start Now</button>
          </div>
        </div>
      </section>

      {/* FSBO */}
      <section id="fsbo" className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-xl font-semibold">For Sale By Owner (FSBO)</h2>
        <div className="mt-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-600">List your property directly and reach thousands of buyers. Our AI helps you craft a professional listing.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Full name" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Email" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Phone" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Property address" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Asking price ($)" />
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Beds" />
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Baths" />
            </div>
          </div>
          <textarea className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={4} placeholder="Property description" />
          <button className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400">Submit FSBO Listing</button>
          <p className="mt-2 text-xs text-slate-500">Demo only. Wire to MLS/CRM via API in production.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 py-10 text-center text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p>© {new Date().getFullYear()} Neuro Real Estate Agent · Philadelphia, PA</p>
          <p className="mt-1 text-sky-300">Powered by Advanced AI Technology <span className="ml-1 inline-block rounded-full bg-sky-600 px-2 py-0.5 text-xs text-white">AI‑Powered</span></p>
        </div>
      </footer>

      {/* Floating Chat */}
      <button
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-sky-500 text-2xl text-white shadow-lg hover:bg-sky-400"
        aria-label="Toggle chat"
      >
        💬
      </button>

      <div className={`fixed bottom-24 right-5 z-30 w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 transition-all ${chatOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <div className="flex items-center justify-between bg-sky-500 px-4 py-3 text-white">
          <div className="font-semibold">Neuro AI Assistant</div>
          <button onClick={() => setChatOpen(false)} className="text-2xl leading-none">×</button>
        </div>
        <div ref={chatRef} className="h-64 space-y-2 overflow-y-auto bg-slate-50 px-4 py-3">
          {msgs.map((m, i) => (
            <div key={i} className={`${m.who === 'bot' ? 'bg-white' : 'bg-sky-500 text-white'} w-fit max-w-[85%] rounded-xl px-3 py-2 text-sm shadow`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t bg-white px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==='Enter') send(); }}
            placeholder="Type your message…"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
          />
          <button onClick={send} className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400">Send</button>
        </div>
      </div>
    </div>
  );
}
