// A product recording inside a static laptop frame. Sized in cqw of its own box, so it scales anywhere
// (deck slides and case-study pages).
export default function LaptopVideo({
  src,
  poster,
  ratio,
  className = "",
}: {
  src: string;
  poster?: string;
  ratio: string; // video aspect, e.g. "1600/804"
  className?: string;
}) {
  return (
    <div className={`[container-type:inline-size] ${className}`}>
      <div className="mx-[5cqw] rounded-t-[2cqw] bg-[#1d1e22] p-[1.1cqw] pb-[1.4cqw] shadow-[0_0_0_0.15cqw_#3a3b40_inset]">
        <video
          className="block w-full rounded-[0.9cqw] bg-white"
          style={{ aspectRatio: ratio }}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="relative h-[2cqw] rounded-b-[1.8cqw] bg-gradient-to-b from-[#e4e6ea] to-[#a9adb6] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgba(26,34,83,0.35)]">
        <span className="absolute left-1/2 top-0 h-[0.75cqw] w-[14cqw] -translate-x-1/2 rounded-b-[0.75cqw] bg-[#9a9ea8]" />
      </div>
    </div>
  );
}
