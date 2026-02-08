import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Gallery from '@/components/sections/Gallery'
import Team from '@/components/sections/Team'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Gallery />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      {/* <Footer /> */}
    </>
  )
}
