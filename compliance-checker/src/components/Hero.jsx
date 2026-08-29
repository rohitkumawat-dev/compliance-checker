import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-[610px] overflow-hidden bg-[#080808]">

      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">

        {/* Blue glow */}
        <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Green glow */}
        <div className="absolute left-[45%] top-[5%] h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* Purple glow */}
        <div className="absolute right-[5%] top-[30%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      </div>

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[610px] max-w-[1000px] flex-col items-center justify-center px-6 text-center">

        {/* Small label */}
        <div className="mb-6 font-mono text-xs tracking-[0.22em] text-white/40">
          FREE&nbsp;&nbsp;·&nbsp;&nbsp;PRIVATE&nbsp;&nbsp;·&nbsp;&nbsp;AUTOMATED
        </div>

        {/* Main heading */}
        <h1 className="max-w-[950px] text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          Verify what's really
          <br />
          on your label.
        </h1>

        {/* Subtitle */}
        <h2 className="mt-6 text-xl font-normal text-white/45 sm:text-2xl">
          Packaged Commodity Compliance Checker
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-[650px] text-base leading-7 text-white/55 sm:text-lg">
          Scan or upload a packaged product label and automatically
          check mandatory declarations under the Legal Metrology
          (Packaged Commodities) Rules, 2011.
        </p>

        {/* Action buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">

          {/* Scan */}
          <Link
            to="/scanner"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
          >
            Scan product
          </Link>

          {/* Upload */}
          <Link
            to="/scanner"
            className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Upload label
          </Link>

          {/* Enter details */}
          <Link
            to="/scanner"
            className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Enter details
          </Link>

        </div>

        {/* Privacy message */}
        <p className="mt-6 text-xs text-white/30">
          Your product information is processed securely.
        </p>

      </div>

    </section>
  )
}

export default Hero