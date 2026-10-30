// H-1B deck (hidden tab, /deck?deck=h1b): work authorization for employers — status, timeline, what it takes.
// Styled with the Movemint redesign design system (theme "mm" in deck.css): surface cards with line borders,
// raspberry for text, light raspberry for shapes, the logo gradient once (the OPT bar).
// Facts as of Oct 2026; dates past OPT start are approximate (set by the EAD cards). Not legal advice.


export function H1bWhy() {
  return (
    <div className="my-auto grid grid-cols-2 gap-[1.8cqw] pb-[2cqw]">
      {[
        {
          k: "For Movemint",
          t: "H-1B is good for us",
          items: ["A powerful recruitment tool for an employer", "Up to 6 years of work authorization (3 years, renewable once)"],
        },
        {
          k: "For this hire",
          t: "We really like Zoey",
          items: ["Zoey is on OPT now, so she can start right away", "Zoey will navigate the H-1B process and do as much of it as she can"],
        },
      ].map((c) => (
        <div key={c.k} className="rounded-[1.2cqw] bg-[var(--mm-surface)] p-[2.6cqw] shadow-[inset_0_0_0_1px_var(--mm-line)]">
          <p className="text-[1cqw] font-bold uppercase tracking-[0.12em] text-[var(--c)]">{c.k}</p>
          <p className="mt-[0.8cqw] text-[2.4cqw] font-bold leading-tight text-[var(--ink)]">{c.t}</p>
          <ul className="mt-[1.4cqw] space-y-[0.8cqw]">
            {c.items.map((t) => (
              <li key={t} className="flex gap-[0.8cqw] text-[1.45cqw] leading-snug text-[var(--mm-muted)]">
                <span className="mt-[0.6cqw] h-[0.55cqw] w-[0.55cqw] shrink-0 rounded-full bg-[var(--mm-accent)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function H1bWhat() {
  return (
    <>
      <div className="my-auto">
        <ul className="max-w-[66cqw] space-y-[1.4cqw]">
          {[
            <>A non-immigrant visa that lets qualified companies sponsor non-citizens to work in <b className="font-semibold text-[var(--ink)]">specialty occupations</b> in the U.S.*</>,
            <>These jobs require applying <b className="font-semibold text-[var(--ink)]">a body of highly specialized knowledge</b> and at least <b className="font-semibold text-[var(--ink)]">a bachelor’s degree or its equivalent</b>.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-[1cqw] text-[1.7cqw] leading-snug text-[var(--mm-muted)]">
              <span className="mt-[0.75cqw] h-[0.6cqw] w-[0.6cqw] shrink-0 rounded-full bg-[var(--mm-accent)]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        {/* how Zoey meets it */}
        <div className="mt-[3cqw] flex max-w-[66cqw] items-start gap-[1.2cqw] rounded-[1.2cqw] bg-[var(--mm-tint)] px-[2cqw] py-[1.6cqw]">
          <span className="mt-[0.15cqw] flex h-[2.2cqw] w-[2.2cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-white">
            <svg viewBox="0 0 24 24" className="h-[1.3cqw] w-[1.3cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <p className="text-[1.6cqw] leading-snug text-[var(--ink)]">
            Zoey has a <b className="font-semibold">master’s from Stanford</b> (Learning, Design &amp; Technology), a bachelor’s in Human-Computer Interaction, and product design experience across fintech and AI startups.
          </p>
        </div>
      </div>
      <p className="text-right text-[1cqw] text-[var(--mm-muted)]">
        * More information:{" "}
        <a href="https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations" target="_blank" rel="noreferrer" className="font-medium text-[var(--c)] underline underline-offset-[0.2cqw]">
          USCIS · H-1B specialty occupations
        </a>
      </p>
    </>
  );
}

export function H1bCap() {
  return (
    <div className="my-auto">
      <div className="flex items-end justify-between gap-[3cqw]">
        <p className="flex items-baseline gap-[1cqw]">
          <span className="text-[6.4cqw] font-bold leading-none tracking-[-0.03em] text-[var(--ink)] tabular-nums">85,000</span>
          <span className="text-[1.7cqw] font-medium text-[var(--mm-muted)]">new H-1B visas per year</span>
        </p>
        <p className="max-w-[30cqw] pb-[0.6cqw] text-right text-[1.2cqw] leading-snug text-[var(--mm-muted)]">
          Set by U.S. Citizenship and Immigration Services (USCIS), which oversees H-1B
        </p>
      </div>
      {/* the split, to scale */}
      <div className="mt-[2cqw] flex gap-[0.4cqw]">
        <div className="flex h-[6cqw] flex-col justify-center rounded-[0.8cqw] bg-[var(--mm-surface)] px-[1.6cqw] shadow-[inset_0_0_0_1px_var(--mm-line)]" style={{ width: `${(65 / 85) * 100}%` }}>
          <span className="text-[1.9cqw] font-bold tabular-nums text-[var(--ink)]">65,000</span>
          <span className="text-[1.1cqw] text-[var(--mm-muted)]">Regular cap · any bachelor’s or higher</span>
        </div>
        <div className="flex h-[6cqw] flex-col justify-center rounded-[0.8cqw] px-[1.6cqw] text-white" style={{ width: `${(20 / 85) * 100}%`, backgroundImage: "var(--mm-gradient)" }}>
          <span className="text-[1.9cqw] font-bold tabular-nums">20,000</span>
          <span className="text-[1.1cqw] text-white/90">Reserved for U.S. master’s or higher</span>
        </div>
      </div>
      <p className="mt-[1.6cqw] flex gap-[1cqw] text-[1.45cqw] leading-snug text-[var(--mm-muted)]">
        <span className="mt-[0.65cqw] h-[0.55cqw] w-[0.55cqw] shrink-0 rounded-full bg-[var(--mm-accent)]" />
        Picked by lottery, weighted by the offered wage level since 2026. Master’s holders are entered in the regular draw first, and if not picked, again in the master’s draw.
      </p>
      {/* latest round (FY 2027, drawn March 2026) */}
      <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1.6cqw]">
        {[
          ["211,600", "registrations in the latest lottery (FY 2027, March 2026), down 38% from the year before"],
          ["71.5%", "of those selected held a U.S. advanced degree, up from 57%"],
        ].map(([n, t]) => (
          <p key={n} className="flex items-baseline gap-[1cqw] border-t border-[var(--mm-line)] pt-[1cqw]">
            <span className="text-[2.2cqw] font-bold tabular-nums tracking-tight text-[var(--ink)]">{n}</span>
            <span className="text-[1.15cqw] leading-snug text-[var(--mm-muted)]">{t}</span>
          </p>
        ))}
      </div>
      <div className="mt-[2cqw] flex items-center gap-[1.2cqw] rounded-[1.2cqw] bg-[var(--mm-tint)] px-[2cqw] py-[1.4cqw]">
        <span className="flex h-[2.2cqw] w-[2.2cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-white">
          <svg viewBox="0 0 24 24" className="h-[1.3cqw] w-[1.3cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <p className="text-[1.6cqw] leading-snug text-[var(--ink)]">
          Zoey has a U.S. master’s degree, so she gets <b className="font-semibold">two chances in every lottery</b>.
        </p>
      </div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[1.2cqw] rounded-[1.2cqw] bg-[var(--mm-tint)] px-[2cqw] py-[1.3cqw]">
      <span className="flex h-[2.2cqw] w-[2.2cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-white">
        <svg viewBox="0 0 24 24" className="h-[1.3cqw] w-[1.3cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <p className="text-[1.5cqw] leading-snug text-[var(--ink)]">{children}</p>
    </div>
  );
}

// Dates follow the FY 2027 season (registration Mar 4–19, 2026); USCIS announces FY 2028 dates in early 2027.
const MILESTONES = [
  { n: "01", t: "Registration", when: "Early March", note: "About 2 weeks", items: ["Online at my.uscis.gov", "Company name, EIN, address, signatory + my details", "$215"] },
  { n: "02", t: "Lottery results", when: "By March 31", note: "Emailed by USCIS", items: ["Selected → step 3", "Not selected → I keep working on STEM OPT; we try again next March"] },
  { n: "03", t: "Petition filing", when: "Apr 1 – Jun 30", note: "3-month window", items: ["Labor Condition Application (Dept. of Labor, free)", "Form I-129, usually by an immigration attorney"] },
  { n: "04", t: "H-1B starts", when: "October 1", note: "Cap-gap covers the wait", items: ["OPT carries me until then, so there’s no gap"] },
];

export function H1bProcess() {
  return (
    <>
      <div className="my-auto">
        {/* the line, with a node per milestone; the filing window is drawn as a thicker span */}
        <div className="relative grid grid-cols-4">
          <span aria-hidden="true" className="absolute left-[1.1cqw] right-[calc(25%-1.1cqw)] top-[1.1cqw] h-[0.2cqw] -translate-y-1/2 bg-[var(--mm-line)]" />
          <span aria-hidden="true" className="absolute left-[50%] right-[25%] top-[1.1cqw] h-[0.7cqw] -translate-y-1/2 rounded-full bg-[var(--mm-tint)]" />
          {MILESTONES.map((m, i) => (
            <div key={m.n} className="relative pr-[2cqw]">
              <span
                aria-hidden="true"
                className={`relative flex h-[2.2cqw] w-[2.2cqw] items-center justify-center rounded-full text-[0.95cqw] font-bold tabular-nums ${i === 3 ? "text-white" : "bg-white text-[var(--c)] shadow-[inset_0_0_0_0.18cqw_var(--mm-accent)]"}`}
                style={i === 3 ? { backgroundImage: "var(--mm-gradient)" } : undefined}
              >
                {m.n}
              </span>
              <p className="mt-[1.6cqw] text-[1cqw] font-bold uppercase tracking-[0.12em] text-[var(--c)]">{m.when}</p>
              <p className="mt-[0.5cqw] text-[2cqw] font-bold leading-tight text-[var(--ink)]">{m.t}</p>
              <p className="mt-[0.3cqw] text-[1.05cqw] text-[var(--mm-muted)]">{m.note}</p>
              <ul className="mt-[1.2cqw] space-y-[0.6cqw] border-t border-[var(--mm-line)] pt-[1.1cqw]">
                {m.items.map((t) => (
                  <li key={t} className="text-[1.2cqw] leading-snug text-[var(--mm-muted)]">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Check>Registration takes about <b className="font-semibold">20 minutes</b>, and Zoey will prepare everything she can.</Check>
      <p className="mt-[1cqw] text-right text-[1cqw] text-[var(--mm-muted)]">
        Dates from the latest (FY 2027) season; USCIS confirms each year’s dates in early spring ·{" "}
        <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-electronic-registration-process" target="_blank" rel="noreferrer" className="font-medium text-[var(--c)] underline underline-offset-[0.2cqw]">USCIS registration guide</a>
      </p>
    </>
  );
}

// Government fees per USCIS (Form G-1055 / I-129 H & L fees page, updated Sept 9, 2026). Small = 25 or fewer FTEs.
const FEES: [string, string, number, number][] = [
  ["Registration", "Step 1", 215, 215],
  ["I-129 base filing fee", "Step 3", 460, 780],
  ["ACWIA training fee", "Step 3", 750, 1500],
  ["Fraud prevention & detection fee", "Step 3", 500, 500],
  ["Asylum program fee", "Step 3", 300, 600],
];
// Outside immigration attorney: planning estimate, not a USCIS fee.
const ATTY = [2000, 5000] as const;
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function H1bCost() {
  const small = FEES.reduce((a, f) => a + f[2], 0);
  const large = FEES.reduce((a, f) => a + f[3], 0);
  return (
    <>
      <div className="my-auto grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-[3cqw]">
        {/* comparison table: small (25 or fewer full-time-equivalent staff) vs larger employers */}
        <table className="w-full border-collapse text-[1.2cqw]">
          <thead>
            <tr className="text-[0.95cqw] font-bold uppercase tracking-[0.1em] text-[var(--mm-muted)]">
              <th className="pb-[0.8cqw] text-left font-bold">Cost</th>
              <th className="pb-[0.8cqw] text-right font-bold">25 or fewer staff</th>
              <th className="pb-[0.8cqw] text-right font-bold">26+ staff</th>
            </tr>
          </thead>
          <tbody>
            {FEES.map(([name, step, a, b]) => (
              <tr key={name} className="border-t border-[var(--mm-line)]">
                <td className="py-[0.7cqw] text-[var(--ink)]">{name} <span className="text-[1cqw] text-[var(--mm-muted)]">· {step}</span></td>
                <td className="py-[0.7cqw] text-right tabular-nums text-[var(--ink)]">{usd(a)}</td>
                <td className="py-[0.7cqw] text-right tabular-nums text-[var(--mm-muted)]">{usd(b)}</td>
              </tr>
            ))}
            <tr className="border-t-[0.15cqw] border-[var(--ink)] font-semibold">
              <td className="py-[0.7cqw] text-[var(--ink)]">Government fees <span className="font-normal text-[var(--mm-muted)]">(approx.)</span></td>
              <td className="py-[0.7cqw] text-right tabular-nums text-[var(--ink)]">≈ {usd(small)}</td>
              <td className="py-[0.7cqw] text-right tabular-nums text-[var(--ink)]">≈ {usd(large)}</td>
            </tr>
            <tr className="border-t border-[var(--mm-line)]">
              <td className="py-[0.7cqw] text-[var(--ink)]">Outside immigration attorney <span className="text-[1cqw] text-[var(--mm-muted)]">· planning estimate</span></td>
              <td className="py-[0.7cqw] text-right tabular-nums text-[var(--ink)]">~{usd(ATTY[0])}–{usd(ATTY[1])}</td>
              <td className="py-[0.7cqw] text-right tabular-nums text-[var(--mm-muted)]">~{usd(ATTY[0])}–{usd(ATTY[1])}</td>
            </tr>
            <tr className="border-t-[0.15cqw] border-[var(--ink)] font-bold">
              <td className="py-[0.8cqw] text-[var(--ink)]">Total if selected</td>
              <td className="py-[0.8cqw] text-right tabular-nums text-[var(--c)]">~{usd(small + ATTY[0])}–{usd(small + ATTY[1])}</td>
              <td className="py-[0.8cqw] text-right tabular-nums text-[var(--ink)]">~{usd(large + ATTY[0])}–{usd(large + ATTY[1])}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col gap-[1.2cqw]">
          <div className="rounded-[1.2cqw] p-[2cqw] text-white" style={{ backgroundImage: "var(--mm-gradient)" }}>
            <p className="text-[1cqw] font-bold uppercase tracking-[0.12em] text-white/90">Example budget · small employer · if selected</p>
            <p className="mt-[0.6cqw] text-[3.2cqw] font-bold leading-none tracking-tight tabular-nums">~{usd(small + ATTY[0])}–{usd(small + ATTY[1])}</p>
          </div>
          <div className="flex items-start gap-[1cqw] rounded-[1cqw] bg-[var(--mm-tint)] px-[1.4cqw] py-[1.1cqw]">
            <span className="mt-[0.1cqw] flex h-[1.8cqw] w-[1.8cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-white">
              <svg viewBox="0 0 24 24" className="h-[1.1cqw] w-[1.1cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <p className="text-[1.15cqw] leading-snug text-[var(--ink)]">
              Movemint doesn’t need an in-house immigration lawyer. An external immigration attorney can handle the process, and I’m happy to research
              options and help coordinate everything.
            </p>
          </div>
          <ul className="space-y-[0.7cqw] text-[1.1cqw] leading-snug text-[var(--mm-muted)]">
            <li><b className="text-[var(--ink)]">Only $215 is spent before the lottery.</b> The rest is paid only if I’m selected.</li>
            <li><b className="text-[var(--ink)]">Optional:</b> premium processing, $2,965, for a faster decision.</li>
            <li className="rounded-[0.8cqw] border-l-[0.3cqw] border-[var(--c)] bg-[var(--mm-surface)] px-[1.2cqw] py-[0.9cqw] text-[var(--ink)]">
              The <b className="font-semibold">$100,000 H-1B fee</b> is currently <b className="font-semibold">blocked by court orders</b>. Even if reinstated, it is
              <b className="font-semibold"> not expected to apply to my case</b>, as I would be applying for a change of status from F-1 to H-1B while remaining in the
              U.S., rather than through overseas visa processing.
            </li>
          </ul>
        </div>
      </div>
      <p className="text-right text-[1cqw] text-[var(--mm-muted)]">
        Fees as of Oct 2026 · confirm current amounts on the{" "}
        <a href="https://www.uscis.gov/forms/all-forms/h-and-l-filing-fees-for-form-i-129-petition-for-a-nonimmigrant-worker" target="_blank" rel="noreferrer" className="font-medium text-[var(--c)] underline underline-offset-[0.2cqw]">USCIS H-1B filing fees</a>{" "}
        page before filing
      </p>
    </>
  );
}

// One shared path (now → STEM OPT), then the lottery branches into selected / not selected.
function Card({ k, t, items, tone = "plain", className = "" }: { k: string; t: string; items: React.ReactNode[]; tone?: "plain" | "yes" | "no"; className?: string }) {
  return (
    <div
      className={`flex flex-col rounded-[1.2cqw] p-[1.8cqw] shadow-[inset_0_0_0_1px_var(--mm-line)] ${tone === "yes" ? "bg-[var(--mm-tint)]" : "bg-[var(--mm-surface)]"} ${className}`}
    >
      <p className="text-[0.95cqw] font-bold uppercase tracking-[0.12em] text-[var(--c)]">{k}</p>
      <p className="mt-[0.6cqw] text-[1.8cqw] font-bold leading-tight text-[var(--ink)]">{t}</p>
      <ul className="mt-[1cqw] space-y-[0.5cqw]">
        {items.map((x, i) => (
          <li key={i} className="flex gap-[0.7cqw] text-[1.2cqw] leading-snug text-[var(--mm-muted)]">
            <span className="mt-[0.5cqw] h-[0.5cqw] w-[0.5cqw] shrink-0 rounded-full bg-[var(--mm-accent)]" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function H1bEmployer() {
  const b = (x: string) => <b className="font-semibold text-[var(--ink)]">{x}</b>;
  return (
    <>
      <div className="my-auto grid grid-cols-[minmax(0,1fr)_16cqw_minmax(0,1.25fr)] items-center">
        <Card k="01 · Now · Oct 2026" t="On OPT" items={["I can start immediately", "Standard I-9 only", "No petition or visa fees"]} />
        {/* the March 2027 lottery is where the path splits */}
        <div className="relative h-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-[var(--mm-accent)]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M0 50 H 74 C 88 50, 86 24, 100 24" vectorEffect="non-scaling-stroke" />
            <path d="M74 50 C 88 50, 86 76, 100 76" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-[10%] top-1/2 flex -translate-y-1/2 flex-col items-center whitespace-nowrap rounded-full bg-[var(--ink)] px-[1.2cqw] py-[0.6cqw] text-white shadow-[0_0.3cqw_0.8cqw_-0.3cqw_rgb(0_0_0/0.35)]">
            <span className="text-[1cqw] font-semibold leading-tight">March 2027 lottery</span>
            <span className="text-[0.85cqw] leading-tight text-white/70">$215 to enter</span>
          </span>
        </div>
        <div className="flex flex-col gap-[1.2cqw]">
          <Card k="02 · If selected" t="Switch to H-1B" tone="yes" items={["File the H-1B petition (Apr – Jun 2027)", <>H-1B starts {b("Oct 1, 2027")}; cap-gap covers the wait</>]} />
          <Card
            k="03 · If not selected"
            t="Continue on STEM OPT"
            items={[
              "Company enrolls in E-Verify, and we sign Form I-983",
              <>Work authorization continues through {b("Oct 2029")}</>,
              <>We try again in {b("March 2028 and 2029")}</>,
            ]}
          />
        </div>
      </div>
      <Check>If I’m not selected, I continue on STEM OPT and keep working, so there is <b className="font-semibold">no disruption</b>.</Check>
    </>
  );
}

// Appendix: the $100,000 fee — status, and why it wouldn't reach me (as of Oct 2026).
export function H1bFee() {
  const pts = [
    {
      k: "01 · It isn’t being collected",
      t: "Blocked by the courts",
      d: "A federal court vacated the guidance behind the $100,000 payment in June 2026, and the appeals court declined to pause that ruling. The appeal, and a conflicting ruling in another court, are still ongoing.",
    },
    {
      k: "02 · Even if it returns",
      t: "It doesn’t apply to my case",
      d: "USCIS guidance exempts people already in the U.S. who change status from F-1 to H-1B, including students on OPT and STEM OPT. That is exactly my path.",
    },
  ];
  return (
    <>
      <div className="my-auto grid grid-cols-2 gap-[1.8cqw]">
        {pts.map((p) => (
          <div key={p.k} className="rounded-[1.2cqw] bg-[var(--mm-surface)] p-[2.4cqw] shadow-[inset_0_0_0_1px_var(--mm-line)]">
            <p className="text-[1cqw] font-bold uppercase tracking-[0.12em] text-[var(--c)]">{p.k}</p>
            <p className="mt-[0.8cqw] text-[2.2cqw] font-bold leading-tight text-[var(--ink)]">{p.t}</p>
            <p className="mt-[1cqw] text-[1.35cqw] leading-snug text-[var(--mm-muted)]">{p.d}</p>
          </div>
        ))}
      </div>
      <p className="text-[1.05cqw] leading-snug text-[var(--mm-muted)]">
        <b className="font-semibold text-[var(--ink)]">To watch:</b> a separate fee proposed in Aug 2026 would cover F-1 change-of-status cases too. It is only a
        proposal and not in effect. Status as of Oct 2026 ·{" "}
        <a href="https://www.uscis.gov/newsroom/alerts/h-1b-faq" target="_blank" rel="noreferrer" className="font-medium text-[var(--c)] underline underline-offset-[0.2cqw]">USCIS H-1B FAQ</a>
      </p>
    </>
  );
}
