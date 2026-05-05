import Image from 'next/image'
const TEAM = [
  { name: 'Sophie Clarke', role: 'Founder & Creative Director', spec: 'Colour specialist · Balayage expert', years: '10+ years', img: '/sophie.jpg' },
  { name: 'Emma Thompson', role: 'Senior Stylist',              spec: 'Colour correction · Keratin treatments', years: '8 years', img: '/emma.jpg' },
  { name: 'Liam Johnson',  role: 'Stylist',                    spec: "Men's grooming · Textured hair",        years: '5 years', img: '/liam.jpg' },
]

export default function Team() {
  return (
    <section className="section-sm" id="team" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="gold-rule" style={{ display: 'block', width: 32, margin: '0 auto 20px' }} />
          <p className="t-label" style={{ marginBottom: 14 }}>The people behind the scissors</p>
          <h2 className="t-display-md">Meet our team</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {TEAM.map((member, i) => (
            <div key={member.name} style={{ textAlign: 'center' }}>
              {/* Photo placeholder */}
              <div className="img placeholder" style={{
                paddingBottom: '125%',
                borderRadius: 'var(--r-md)',
                position: 'relative',
                marginBottom: 20,
                overflow: 'hidden',
              }}>
                <Image src={member.img} alt={member.name} fill style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 16 }}>
                  <p className="t-label" style={{ color: 'var(--ink-faint)' }}>Team photo</p>
                </div>
                {/* Initial overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 72, fontWeight: 300,
                    color: 'rgba(24,18,14,0.08)',
                    lineHeight: 1,
                  }}>
                    {member.name[0]}
                  </span>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, color: 'var(--ink)', marginBottom: 4 }}>
                {member.name}
              </p>
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 8 }}>{member.role}</p>
              <p className="t-body-sm" style={{ marginBottom: 8 }}>{member.spec}</p>
              <p className="t-label" style={{ color: 'var(--ink-faint)' }}>{member.years}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #team .container > div:last-child { grid-template-columns: 1fr !important; max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
