import { SvgDefs } from './components/SvgDefs'
import { Download } from './sections/Download'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { HowToPlay } from './sections/HowToPlay'
import { Mechanics } from './sections/Mechanics'
import { Navbar } from './sections/Navbar'
import { Stages } from './sections/Stages'
import { Studio } from './sections/Studio'

export default function App() {
  return (
    <>
      <SvgDefs />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-2 text-choco focus:not-sr-only focus:fixed focus:top-4 focus:right-4"
      >
        پرش به محتوا
      </a>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <div className="page-bg">
          <Features />
          <HowToPlay />
          <Mechanics />
          <Stages />
          <Gallery />
          <Studio />
          <Download />
          <Faq />
        </div>
      </main>
      <Footer />
    </>
  )
}
