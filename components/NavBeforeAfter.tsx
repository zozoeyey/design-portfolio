// Connect Link story 2 ("Soft voice. Firm logic.") — before/after of the discussion-board navigation, rebuilt in code
// (crisp at any size). Before: three tabs + a sub-bar on top of the task. After: tabs up top, a breadcrumb
// that says where you are, search + New Discussion on one line.

const C = "rgb(0, 74, 173)";
const Chev = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);
const Search = ({ ph }: { ph: string }) => (
  <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-400 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    <span className="truncate">{ph}</span>
  </span>
);
const Avatar = () => <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8dccf] text-xs font-bold text-[#6b5444]">OR</span>;
const NewBtn = ({ plus = false }: { plus?: boolean }) => (
  <span className="shrink-0 rounded-lg px-4 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: C }}>{plus ? "+ " : ""}New Discussion</span>
);

function BeforeUI() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-black">
      <div className="flex items-center gap-4 px-5 py-3">
        <Search ph="Search discussions by keyword" />
        {["New", "Popular", "Time"].map((t) => (
          <span key={t} className="hidden items-center gap-1 text-sm text-gray-700 sm:flex">{t} <Chev /></span>
        ))}
        <Avatar />
        <NewBtn />
      </div>
      <div data-mark="tabs" className="flex items-center gap-8 bg-[#e6e6e8] px-6 py-3.5 text-base font-bold">
        <span aria-hidden="true">←</span>
        <span>Discussion</span>
        <span>Network</span>
        <span>Resources</span>
      </div>
    </div>
  );
}
function AfterUI() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-black">
      <div className="flex items-end justify-between border-b border-black/[0.06] px-6 pt-3">
        <div className="flex gap-8 text-base">
          {["Discussions", "Network", "Resources"].map((t, i) => (
            <span key={t} className={`pb-3 ${i === 0 ? "font-bold" : "text-gray-600"}`} style={i === 0 ? { boxShadow: `inset 0 -2px 0 ${C}` } : undefined}>{t}</span>
          ))}
        </div>
        <span className="mb-2.5 flex items-center gap-2"><Avatar /><span className="hidden text-sm sm:block">Olivia Rhye</span></span>
      </div>
      <div className="bg-[#f7f8fb] px-5 py-4">
        <p data-mark="crumb" className="text-sm text-gray-600">
          Discussions <span className="text-gray-400">→</span> Popular Topics <span className="text-gray-400">→</span> Artificial Intelligence <span className="text-gray-400">→</span> <b className="text-black">Product</b>
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Search ph="Search" />
          <NewBtn plus />
        </div>
      </div>
    </div>
  );
}
const Label = ({ t, tone }: { t: string; tone: "bad" | "good" }) => (
  <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tone === "bad" ? "#f0a35c" : "#6bd49a" }} />
    {t}
  </span>
);

/* Stacked: before over after, each with a one-line takeaway */
export default function NavBeforeAfter() {
  return (
    <div className="flex flex-col gap-10">
      <figure className="flex flex-col gap-4">
        <figcaption className="flex flex-wrap items-baseline gap-3"><Label t="Before" tone="bad" /><span className="text-base text-[rgb(198,198,210)]">Three tabs sit on top of every task, whether they matter or not.</span></figcaption>
        <BeforeUI />
      </figure>
      <figure className="flex flex-col gap-4">
        <figcaption className="flex flex-wrap items-baseline gap-3"><Label t="After" tone="good" /><span className="text-base text-[rgb(198,198,210)]">A breadcrumb shows where you are; search and posting share one row.</span></figcaption>
        <AfterUI />
      </figure>
    </div>
  );
}
