import React from 'react';

import './About.css';

import leftSectionImage  from '../../assets/leftsectionimage.jpg'

import image1 from '../../assets/cardimage1.jpg'
import image2 from '../../assets/cardimage2.png'



import Card from '../../components/card/Card'

function About() {  

    const cardData = [
                        {
                            image: image1,
                            title: 'Our Goal',
                            description: 'Deliver reliable financial solutions for your success.',
                        },
                        {
                            image: image2,
                            title: 'Our Vision',
                            description: 'Transform financial challenges into growth opportunities.',
                        },
                    


    ]


  
    
  return (
    <div className='about' id='about'>
        <div className='about__container'>

            <div className='about__leftSection'>

                <h3>About Us</h3>

                <h1>Reliable & Cost<br /> Efficient Consultant</h1>

                <p>At MD Enterprise, we are more than just accountants — we are your financial partners. With years of expertise in accounting, tax planning, and business advisory, we empower individuals and businesses to make informed financial decisions and achieve their goals.</p>

                <div className='about__imageContainer'>
                    <img src={leftSectionImage} alt='tax calculation'></img>

                    <p>Our mission is to simplify the complexities of finance so that you can focus on what matters most — growing your business and securing your financial future. Whether you're a small business owner, a startup, or an individual looking for reliable financial guidance, our dedicated team is here to provide tailored solutions that meet your unique needs.   </p>

                </div>

                <a href='#footer' className='about__contactButton'>Get in Touch</a>

            </div>

            <div className='about__rightSection'>


                    {cardData.map((card,index)=><Card image={card.image} title={card.title} description={card.description}/>)}


            </div>       

        </div>
        

    </div>
  )
}

export default About

/*

 <div className='about__leftCardGroup'>
                <Card />
                <Card />
            </div>

            <div className='about__rightCardGroup'>
                <Card />
                <Card />
            </div>
*/