const ITEMS = ['Precision Cuts', 'Balayage', 'Full Colour', 'Highlights', 'Keratin Treatment', 'Blow Dry & Style', 'Root Touch-Up', 'Glossing']

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS] // double for seamless loop

  return (
    <div style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(196,154,60,0.3)',
      borderBottom: '1px solid rgba(196,154,60,0.3)',
      padding: '14px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 16, fontWeight: 300,
              color: 'rgba(240,235,226,0.75)',
              whiteSpace: 'nowrap',
              padding: '0 28px',
              letterSpacing: '0.02em',
            }}>
              {item}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: 10, opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
