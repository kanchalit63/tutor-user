import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'

const LandingPage = () => {
  return (

    <>
      <Navbar />
      <div>
      <Outlet />
      </div>
      <Footer />
      
     </>   


  )
}

export default LandingPage