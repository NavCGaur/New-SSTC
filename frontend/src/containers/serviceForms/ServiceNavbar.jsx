import React, {useState, useEffect} from 'react'
import {ReactComponent as MenuIcon} from '../../assets/menu.svg'
import {ReactComponent as CloseIcon} from '../../assets/xmark.svg'
import DropDown from '../../components/dropdown/DropDown'

function ServiceNavbar() {
  
  const [menuStatus, setMenuStatus] = useState(false);
    

  const handleMenu = () => {
    if (window.innerWidth < 900) setMenuStatus(!menuStatus);
  };

 

  const handleResize = () => {
    if (window.innerWidth > 900) setMenuStatus(false);
  };

  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const serviceData = [
    { serviceName: 'This is service one', link: 'service-one' },
    { serviceName: 'This is service two', link: 'service-one' },
    { serviceName: 'This is service three', link: 'service-one' },
    { serviceName: 'This is service four', link: 'service-one' },
  ];

  return (
<div className='header__fixedSection' style={{ backgroundColor: '#21295c'}}>

    <div className='header__separatingLine'></div>

    <div className='header__opaqueEffect'></div>

    <div className='header__container'>
        
        <h1 className='header__logo'> MD ASSOCIATES</h1>

        <div className='navbar__menu' onClick={handleMenu}>
             {menuStatus? <CloseIcon className= 'navbar__close-icon'/> : <MenuIcon className='navbar__menu-icon'  / >
             }
        </div>

        <nav className={menuStatus?'header__navbar-hidden':'header__navbar'} >

            <a href='http://localhost:3000/'className='header__home' onClick={handleMenu} style={{textDecoration:'none'}} >Home</a >


            <a href='#footer'className='header__loginButton' style={{textDecoration:'none'}}>Login</a>


        </nav>

    </div>

</div>   

  );
}

export default ServiceNavbar;