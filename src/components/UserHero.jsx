import {motion} from 'framer-motion';
import Spline from '@splinetool/react-spline';
const UserHero = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-black to-[#FF6D1F] flex xl:flex-row flex-col-reverse items-center justify-center px-6 md:px-12 lg:px-24
       justify-between lg:px-24 px-10 relative overflow-hidden ">

        <div className='z-40 xl:mb-0 mb-[20%] '>
            <motion.h1 
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{       
                delay:1.3,
                duration:1.5,
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold z-10 mb-6">Building Fast <br/> Reliable Results
            </motion.h1>

            <motion.p 
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{       
                delay:1.3,
                duration:1.5,
            }}
            
            className='text-xl md:text-1xl lg:text-2xl max-w-2xl'>
                An AI-powered ATS that instantly scores your resume 
                <br/>
                 against job requirements and suggests smart improvements to help you stand out.
            </motion.p>
        </div>
         <div>
             <Spline 
              className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0 "
             scene="https://prod.spline.design/Tks1TItdy9vE5uR9/scene.splinecode" />
         </div>
    </section>
  )
}

export default UserHero