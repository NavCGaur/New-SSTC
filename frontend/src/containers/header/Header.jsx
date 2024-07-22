//React imports
import React from 'react'

//Style imports
import './Header.css'


//Image import
import backgroundImage from '../../assets/home-background-image.jpg'

//Component imports
import Contact from '../../components/contact/Contact'
import DropDown from '../../components/dropdown/DropDown'

function Header() {

  
  const circleArray = Array.from({length:14}, (_,index)=>index);

  const serviceData = [{serviceName:'This is service one', 
                        link: 'service-one'},

                       {serviceName:'This is service two', 
                        link: 'service-one'},
                    
                       {serviceName:'This is service three', 
                        link: 'service-one'},

                       {serviceName:'This is service four', 
                        link: 'service-one'},

                        ];


    

  return (
    <header className='header' id='home'>
        
        <div class="header__opacity-overlay"></div>
   
            
        <div className='header__fixedSection' >

            <Contact />

            <div className='header__separatingLine'></div>

            <div className='header__opaqueEffect'></div>

            <div className='header__container'>
                
                <h1 className='header__logo'> SHREE SAI ENTERPRISE</h1>

                <nav className='header__navbar' >

                    <a href='#home'className='header__home' >Home</a>

                    <DropDown pageId = {'#service'} title = {'Service'} dropDownData={serviceData}/>

                    <a href='#about' className='header__about'>About Us</a>

                    <a href='#footer' className='header__contact'>Contact Us</a>

                </nav>

            </div>

        </div>   

        <div className='header__deisgnOne'>
            <div className='header__designOne-left'></div>
            <div className='header__designOne-right'></div>
        </div>


        <div className='header__designTwo'></div>
    

        <div className='header__designThree'>
            {circleArray.map(()=><div className='header__circles'>  </div>)}
        </div>

        <div className='header__centerContainer'>
            <div className='header__smallText'>
                <p>Tax Consulting</p>
                <span></span>
                <p>GST Filing</p>
                <span></span>
                <p>Auditing</p>
            </div>

            <h1 className='header__title'> Accounting & Tax <br/>Consulting</h1>

            <a href='#footer'className='header__centerButton'>Contact Us

            </a>

        </div>
        

            
    </header>
  )
}

export default Header


/*
<img src={backgroundImage} className='header__backgroundImage' alt='background'></img>

        <div className='imageBlueColor'></div>

*/