//React imports
import React, {useState, useEffect} from 'react'

//Style imports
import './Header.css'

import {ReactComponent as MenuIcon} from '../../assets/menu.svg'
import {ReactComponent as CloseIcon} from '../../assets/xmark.svg'
import AccountingImage from '../../assets/accounting.png'


//Component imports
import Contact from '../../components/contact/Contact'
import DropDown from '../../components/dropdown/DropDown'
import { Link } from 'react-router-dom'

function Header() {

    

  const [menuStatus, setMenuStatus] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  let scrollColor = 'rgba(0, 0, 0, 0)'; 



  function handleMenu(){
    if (window.innerWidth < 900) {
    setMenuStatus(!menuStatus);
    }

  }

  // Add an event listener to handle window resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) {
        setMenuStatus(false);
      }
    }

    function handleScroll(){
        const position = window.scrollY;
        setScrollPosition(position);    
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);


    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

    };
  }, []);

  if (scrollPosition > 500) {
    scrollColor = 'rgb(9, 51, 111)';
  } 

  
  const circleArray = Array.from({length:14}, (_,index)=>index);

  const serviceData = [{serviceName:'GST Registration', 
                        link: '/gstregistration'},

                       {serviceName:'MSME Registration', 
                        link: '/gstregistration'},
                      
                      {serviceName:'Business Entity Registration', 
                        link: '/gstregistration'},
                    
                       {serviceName:'GST Return Filing', 
                        link: '/gstregistration'},

                       {serviceName:'Income Tax Return Filing', 
                        link: '/gstregistration'},

                      {serviceName:'Accounting & BookKeeping', 
                        link: '/gstregistration'},

                        ];
    

  return (
    <header className='header' id='home'>
        <div class="header__opacity-overlay"></div>
   
            
        <div className='header__fixedSection' style={{backgroundColor:scrollColor}}>

            <Contact />

            <div className='header__separatingLine'></div>

            <div className='header__opaqueEffect'></div>

            <div className='header__container'>
                
                <h1 className='header__logo'> MD ASSOCIATES</h1>

                <div className='navbar__menu' onClick={handleMenu}>
                     {menuStatus? <CloseIcon className= 'navbar__close-icon'/> : <MenuIcon className='navbar__menu-icon'  / >
                     }
                </div>

                <nav className={menuStatus?'header__navbar-hidden':'header__navbar'} >

                    <a href='#home'className='header__home' onClick={handleMenu}>Home</a >

                    <DropDown pageId = {'#service'} title = {'Service'} dropDownData={serviceData} onClick={handleMenu} / >

                    <a href='#about' className='header__about' onClick={handleMenu}>About Us</a>

                    <a href='#footer' className='header__contact' onClick={handleMenu}>Contact Us</a>

                    <Link to='/service/login'className='header__loginButton'>Login</Link>


                </nav>

            </div>

        </div>   

        <div className='header__deisgnOne'>
           <img src={AccountingImage} alt='accounting'/>
        </div>


        <div className='header__designTwo'></div>
    

        <div className='header__designThree'>
            {circleArray.map(()=><div className='header__circles'>  </div>)}
        </div>

        <div className='header__centerContainer'>
          

            <h1 className='header__title'> Expert Accounting <br/><span className='header__title-small'>Tailored Solutions</span></h1>

            <a href='#footer'className='header__centerButton'>Contact Us

            </a>

        </div>

     
        <div className='header__smallText'>
        <p>Tax Consulting</p>
        <span></span>
        <p>GST Filing</p>
        <span></span>
        <p>Licences and Registrations</p>
        </div>

            
    </header>
  )
}

export default Header

