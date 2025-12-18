import {motion} from 'framer-motion'
import { FiGithub,FiTwitter,FiLinkedin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
  localStorage.removeItem('authToken');
  navigate('/');
};

  return (
    <header className="w-full z-50 transition-all duration-300 ">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
                       <motion.div 
                       initial={{opacity:0, x:-50}}
                       animate={{opacity:1,x:0}}
                       transition={{
                           type:'spring',
                            stiffness:100,
                            damping:25,
                            delay:0.1,
                            duration:1.2,
                       }}
                       
                       className="flex items-center">
                              <div className='h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100
                              flex items-center justify-center text-lg text-[#FF6D1F] font-bold text-xl mr-3 '>
                                     D
                              </div>
                              <span className='text-xl font-bold bg-gradien from-grey'>
                                Dashboard
                              </span>
                       </motion.div>

                    <nav className='lg:flex hidden space-x-16'>
                         {["Home","About","Projects","Experience","Contact"].map((item,index)=>(
                          <motion.a  
                            key={item}
                            initial={{opacity:0, y:-20}}
                            animate={{opacity:1,y:0}}
                            transition={
                              {
                                type:'spring',
                                stiffness:100,
                                damping:25,
                                delay:0.7 + index * 0.2,
            
                              }
                            }
                            className='relative text-gray-800 dark:text-gray-200 hover:[#FF6D1F] 
                            dark:hover:text-[#FF6D1F]  font-medium transition-colors duration-300 group'
                          href="#">
                                {item}
                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6D1F] group-hover:w-full
                                transition-all duration-300'></span>
                          </motion.a>
                         ))}
                        
                    </nav>

                    <div className='md:flex hidden items-center space-x-4 '> 
                      <motion.a 
                      initial={{opacity:0, scale:0.5}}
                            animate={{opacity:1,scale:1}}
                            transition={
                              {
                      
                                delay:1.3,
                                duration:0.5,
                              }
                            }
                      className='text-gray-700 dark:text-gray-300 hover:text-[#FF6D1F]  dark:hover:text-[#d87d4c]
                      transition-colors duration-300' 
                      href="#">
                           <FiGithub className='w-5 h-5'/>
                      </motion.a>
                      <motion.a 
                      initial={{opacity:0, scale:0.5}}
                            animate={{opacity:1,scale:1}}
                            transition={
                              {
                      
                                delay:1.5,
                                duration:0.5,
                              }
                            }
                      className='text-gray-700 dark:text-gray-300 hover:text-[#FF6D1F]  dark:hover:text-[#d87d4c] 
                      transition-colors duration-300' 
                      href="#">
                           <FiTwitter className='w-5 h-5'/>
                      </motion.a>
                      <motion.a 
                      initial={{opacity:0, scale:0.5}}
                            animate={{opacity:1,scale:1}}
                            transition={
                              {
                      
                                delay:1.7,
                                duration:0.5,
                              }
                            }
                      className='text-gray-700 dark:text-gray-300 hover:text-[#FF6D1F]  dark:hover:text-[#d87d4c] 
                      transition-colors duration-300' 
                      href="#">
                           <FiLinkedin className='w-5 h-5'/>
                      </motion.a>

                    </div>

                    <motion.button 
                     initial={{opacity:0, scale:0.5}}
                            animate={{opacity:1,scale:1}}
                            transition={
                              {
                      
                                delay:1.9,
                                duration:0.5,
                              }
                            }
                    className='px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-black 
                    font-bold hover:from-gray-500 hover:to-gray-200 transition-all duration-300'>
                      Ats Score
                    </motion.button>
                    <motion.button
  type="button"
  onClick={handleLogout}
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    delay: 1.9,
    duration: 0.5,
  }}
  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-black 
  font-bold hover:from-gray-500 hover:to-gray-200 transition-all duration-300"
>
  Logout
</motion.button>

             </div>


    </header>
  )
}

export default UserHeader