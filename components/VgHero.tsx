/* eslint-disable @next/next/no-img-element */
// ValueGlance case-study hero: the desktop + mobile Data Visualization screens (from the deck intro) in a
// MacBook and an iPhone frame, phone overlapping the laptop's corner, on the soft lavender ground.
// Sized in % / cqw so it stays sharp at any width.

function Laptop({ className = "" }: { className?: string }) {
  return (
    <div className={`[container-type:inline-size] ${className}`}>
      <div className="mx-[6cqw] rounded-t-[2.4cqw] bg-[#16171b] p-[1.3cqw] pb-[1.6cqw] shadow-[0_0_0_0.15cqw_#3a3b40_inset]">
        <div className="relative overflow-hidden rounded-[0.6cqw] bg-white">
          <img src="/deck/vg-desktop.jpg" alt="ValueGlance data visualization on desktop" className="block w-full" />
        </div>
      </div>
      <div className="relative h-[2.6cqw] rounded-b-[2.2cqw] bg-gradient-to-b from-[#e9eaee] to-[#a7abb4]">
        <span className="absolute left-1/2 top-0 h-[0.9cqw] w-[15cqw] -translate-x-1/2 rounded-b-[0.9cqw] bg-[#989ca6]" />
      </div>
    </div>
  );
}
function Phone({ className = "" }: { className?: string }) {
  return (
    <div className={`[container-type:inline-size] ${className}`}>
      <div className="rounded-[16cqw] bg-[#16171b] p-[4.5cqw] shadow-[0_0_0_0.8cqw_#3a3b40_inset]">
        <div className="relative overflow-hidden rounded-[12cqw] bg-white">
          {/* status bar + dynamic island */}
          <div className="flex h-[13cqw] items-center justify-between px-[9cqw] text-[5cqw] font-semibold text-black">
            <span>9:41</span>
            <span className="h-[7cqw] w-[30cqw] rounded-full bg-black" />
            <span className="flex items-center gap-[1.5cqw]">
              <span className="h-[3.2cqw] w-[6cqw] rounded-[1cqw] border-[0.6cqw] border-black" />
            </span>
          </div>
          <img src="/deck/vg-mobile.jpg" alt="ValueGlance data visualization on mobile" className="block w-full" />
        </div>
      </div>
    </div>
  );
}

export default function VgHero() {
  return (
    <div
      role="img"
      aria-label="ValueGlance data visualization on a laptop and a phone"
      className="relative aspect-[2400/1498] w-full overflow-hidden rounded-3xl bg-[rgb(234,239,251)]"
    >
      <Laptop className="absolute left-[6%] top-[12%] w-[72%] drop-shadow-[0_24px_40px_rgba(40,48,100,0.22)]" />
      <Phone className="absolute bottom-[6%] right-[8%] w-[19%] drop-shadow-[0_24px_40px_rgba(40,48,100,0.32)]" />
    </div>
  );
}
