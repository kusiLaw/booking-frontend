
import Image from 'next/image'
export default function Gallery() {
  // Placeholder images with different aspect ratios for editorial feel
  const items = [
    { ratio: '120%', label: 'Balayage result',   span: 1 , image: '/balayage.jpg'},
    { ratio: '80%',  label: 'Cut & style',        span: 1 , image: '/cut-style.jpg'},
    { ratio: '100%', label: 'Colour work',         span: 1 , image: '/colour.jpg'},
    { ratio: '80%',  label: 'Salon atmosphere',    span: 2 , image: '/atmosphere.jpg'},
    { ratio: '120%', label: 'Before & after',      span: 1 , image: '/before-after.jpg'},
  ]

  return (
    <section className="section" id="gallery" style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="gold-rule" />
            <p className="t-label" style={{ marginBottom: 14 }}>Our work</p>
            <h2 className="t-display-lg">Gallery</h2>
          </div>
          <p className="t-body" style={{ maxWidth: 320 }}>
            A glimpse of the transformations we create — every one tailored, every one personal.
          </p>
        </div>

        {/* Mosaic grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {/* Row 1: 3 individual */}
          {items.slice(0,3).map((item, i) => (
            <div key={i} className=" relative overflow-hidden  hover:scale-[1.01] hover:shadow-(--sh-lg) transition-all duration-700 ease-out will-change-transform cursor-zoom-in "  
            style={{
              borderRadius: 'var(--r-sm)',
              paddingBottom: item.ratio,
    
            }}
       
            >
              <Image src={item.image} alt={item.label} fill style={{ objectFit: 'cover',  }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 16 }}>
                <p className="t-label" style={{ color: 'var(--ink-faint)' }}>{item.label}</p>
              </div>
            </div>
          ))}

          {/* Row 2: wide + tall */}
          <div className=" relative overflow-hidden md:col-span-2 pb-[55%]  hover:scale-[1.01] hover:shadow-(--sh-lg) transition-all duration-700 ease-out will-change-transform cursor-zoom-in" 
          style={{
            borderRadius: 'var(--r-sm)',

          }}
    
          >
            <Image src="/hair.jpg" alt="Hero image" fill style={{ objectFit: 'cover',  }} />
            
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 16 }}>
              <p className="t-label" style={{ color: 'var(--ink-faint)' }}>Salon atmosphere</p>
            </div>
          </div>

          <div className="relative overflow-hidden  pb-[120%]  hover:scale-[1.01] hover:shadow-(--sh-lg) transition-all duration-700 ease-out will-change-transform cursor-zoom-in" style={{
            borderRadius: 'var(--r-sm)',
            paddingBottom: '120%',
            
          }}
      
          >
              <Image src="/after1.jpg" alt="Hero image" fill style={{ objectFit: 'cover',  }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 16 }}>
              <p className="t-label" style={{ color: 'var(--ink-faint)' }}>Before &amp; after</p>
            </div>
          </div>
        </div>

        <p className="t-label" style={{ textAlign: 'center', marginTop: 32, color: 'var(--ink-faint)' }}>
          Follow us on Instagram <span style={{ color: 'var(--gold)' }}>@cutsandcolourstudio</span> for daily inspiration
        </p>
      </div>

      {/* <style>{`
        @media (max-width: 600px) {
          #gallery .container > div:last-child { grid-template-columns: 1fr !important; }
          #gallery .container > div:last-child > div[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style> */}
    </section>
  )
}
