const TOP_ITEMS = [
  'Intent-Led Design', 'UI/UX Systems', 'Agentic AI', 'Behavioural Research',
  'Intent-Led Design', 'UI/UX Systems', 'Agentic AI', 'Behavioural Research',
  'Intent-Led Design', 'UI/UX Systems', 'Agentic AI', 'Behavioural Research',
]

const BTM_ITEMS = [
  'Meridian', 'Threshold', 'Orion Agent', 'Atlas Navigation', 'Luma Health', 'Forma',
  'Meridian', 'Threshold', 'Orion Agent', 'Atlas Navigation', 'Luma Health', 'Forma',
  'Meridian', 'Threshold', 'Orion Agent', 'Atlas Navigation', 'Luma Health', 'Forma',
]

export default function Marquee() {
  const borderStyle = { borderColor: 'rgba(240,237,230,0.1)' }
  return (
    <div>
      {/* Row 1 — left — services */}
      <div
        className="overflow-hidden border-t border-b py-[14px]"
        style={{ ...borderStyle, background: 'rgba(200,255,0,0.015)' }}
      >
        <div className="flex animate-marquee-left whitespace-nowrap">
          {TOP_ITEMS.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 px-10 uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, letterSpacing: '0.15em', color: '#5a5a52', flexShrink: 0 }}
            >
              {item}
              <span style={{ color: '#c8ff00', fontSize: 8 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right — project names in italic serif */}
      <div
        className="overflow-hidden border-b py-[12px]"
        style={borderStyle}
      >
        <div className="flex animate-marquee-right whitespace-nowrap">
          {BTM_ITEMS.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-12 px-14 italic"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, fontWeight: 300, letterSpacing: '0.02em', color: 'rgba(240,237,230,0.1)', flexShrink: 0 }}
            >
              {item}
              <span style={{ color: 'rgba(200,255,0,0.2)', fontSize: 10, fontStyle: 'normal' }}>◦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
