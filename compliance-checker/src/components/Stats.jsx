const stats = [
  {
    number: '11+',
    label: 'Mandatory declarations',
  },
  {
    number: '25+',
    label: 'Compliance checks',
  },
  {
    number: '08',
    label: 'Common violations',
  },
  {
    number: '94%',
    label: 'Demo compliance rate',
  },
]

function Stats() {
  return (
    <section className="grid grid-cols-1 border-y border-white/10 bg-[#111111] sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-[140px] flex-col items-center justify-center border-white/10 lg:border-r lg:last:border-r-0"
        >

          {/* Number */}
          <div className="font-mono text-4xl font-semibold tracking-tight text-white">
            {stat.number}
          </div>

          {/* Label */}
          <div className="mt-2 text-center text-sm text-white/40">
            {stat.label}
          </div>

        </div>
      ))}

    </section>
  )
}

export default Stats