import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import FeaturedDishes from '../components/sections/FeaturedDishes.jsx'
import Gallery from '../components/sections/Gallery.jsx'
import Reviews from '../components/sections/Reviews.jsx'
import Contacts from '../components/sections/Contacts.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedDishes />
      <Gallery />
      <Reviews />
      <Contacts />
    </>
  )
}