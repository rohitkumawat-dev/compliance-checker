import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'

function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <Hero />
      <Stats />
    </div>
  )
}

export default Home