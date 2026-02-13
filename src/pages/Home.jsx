import React from 'react'
import Hero from '../components/HeroSlider'
import NewRelease from '../components/NewRelease'
import Showcase from '../components/ShowCase'
import PromoSection from '../components/PromoSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Hero />
       <NewRelease />
       <Showcase />
       <PromoSection />
       <Footer />
    </>
  )
}

export default Home
