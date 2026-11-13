import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Globe2, Layers3, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServiceAdvice } from "@/lib/advisor.functions";

const META = {
  aircraft_leasing: { title: "Aircraft Leasing", Icon: Plane },
  aviation_assets: { title: "Aviation Assets", Icon: Globe2 },
  investment_structures: { title: "Investment Structures", Icon: Layers3 },
} as const;

type Result = { recommendations: { service: keyof typeof META; reason: string }[]; note: string };

export function ServiceAdvisor() {
  const advise = useServerFn(getServiceAdvice);
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (needs.trim().length < 15) { setError("Please add a little more detail (at least 15 characters)."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await advise({ data: { needs } });
      if (res.ok) setResult(res.data); else setError(res.error);
    } catch { setError("We couldn't prepare suggestions. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div className="advisor">
      <form onSubmit={submit} className="advisor-form">
        <label htmlFor="advisor-needs" className="eyebrow">Your requirements</label>
        <textarea id="advisor-needs" value={needs} onChange={e => setNeeds(e.target.value)} maxLength={1500} rows={5}
          placeholder="For example: a regional airline looking to add two narrow-body aircraft on lease next year." />
        <div className="advisor-actions">
          <span className="advisor-hint">AI-generated suggestions. Not an offer or advice.</span>
          <Button type="submit" variant="aviation" disabled={loading}>
            {loading ? <><Loader2 className="animate-spin" /> Reviewing</> : <>Suggest services <ArrowUpRight /></>}
          </Button>
        </div>
      </form>
      <div className="advisor-results" aria-live="polite">
        {error && <p className="advisor-error">{error}</p>}
        {result && (result.recommendations.length === 0
          ? <p className="section-description">None of our current focus areas appear to match. {result.note}</p>
          : <>
              {result.recommendations.map(r => { const m = META[r.service]; return (
                <article key={r.service} className="advisor-item"><m.Icon className="focus-icon" /><div><h3>{m.title}</h3><p>{r.reason}</p></div></article>
              ); })}
              <p className="advisor-note">{result.note} <a href="mailto:info@cpaaviations.com">info@cpaaviations.com</a></p>
            </>)}
      </div>
    </div>
  );
}
