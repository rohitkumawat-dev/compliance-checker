import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="h-[72px] border-b border-white/10 bg-[#080808]">
      <div className="mx-auto flex h-full max-w-[1545px] items-center justify-between px-8">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            ⚖
          </div>

          <span className="text-[17px] font-semibold tracking-tight text-white">
            CompliCheck
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-9 text-[14px] text-white/50 md:flex">

          <a
            href="#how-it-works"
            className="transition-colors hover:text-white"
          >
            How it works
          </a>

          <a
            href="#rules"
            className="transition-colors hover:text-white"
          >
            Rules
          </a>

          <a
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </a>

        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">

          {/* Theme Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
          >
            ◐
          </button>

          {/* Scan Button */}
          <Link
            to="/scanner"
            className="hidden rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 sm:block"
          >
            Scan product
          </Link>

          {/* Upload Button */}
          <Link
            to="/scanner"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
          >
            Upload label
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar