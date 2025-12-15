import React from 'react'
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom"
const Header = () => {
    const navigate = useNavigate();
   const toggleMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
   }
  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20" >
            <h2 data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="text-2xl md:text-3xl lg:text-5xl font-light m-0"> 
                RIQ
            </h2>
            <nav className="hidden md:flex items-center gap-12 lg:gap-20">
                <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000"className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Docs 
                </a>

                <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                     Templates
                </a>

                <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2000"className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Features 
                </a>

                <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2500"
     className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Resume check 
                </a>
            </nav>
            <button
      onClick={() => navigate("/register")}
      className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full
      border-none font-medium transition-all duration-500 hover:bg-white
      cursor-pointer z-50"
    >
      SIGNIN
    </button>
            <button onClick={toggleMenu} className='md:hidden text-3xl p-2 z-50'>
            <i class='bx bx-menu'></i> 
            </button>

            <div id='mobileMenu' className='hidden fixed top-16 bottom-0 right-0 md:hidden left-0 p-5 z-40 bg-black bg-opacity-70 
            background-blur- md'> 
                <nav className='flex flex-col gap-6 items-center '>
                    <a className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Docs 
                </a>

                <a className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                     Templates
                </a>

                <a className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Features 
                </a>

                <a className="text-base tracking-wider transition-colors hover:text-grey-300 
                z-50" href="#">
                    Resume check 
                </a>

                </nav>
            </div>
    </header>
  )
}

export default Header