import React from 'react';

import './About.css';

import leftSectionImage  from '../../assets/leftsectionimage.jpg'

import image1 from '../../assets/cardimage1.jpg'
import image2 from '../../assets/cardimage2.png'
import image3 from '../../assets/cardimage3.png'
import image4 from '../../assets/cardimage4.png'



import Card from '../../components/card/Card'

function About() {  

    const cardData = [
                        {
                            image: image1,
                            title: 'Our Goal',
                            description: 'Long established fact that reader',
                        },
                        {
                            image: image2,
                            title: 'Our Vision',
                            description: 'Long established fact that reader',
                        },
                        {
                            image: image3,
                            title: 'Our Mission',
                            description: 'Long established fact that reader',
                        },
                        {
                            image: image4,
                            title: 'Our Team',
                            description: 'Long established fact that reader',
                        },


    ]


  
    
  return (
    <div className='about' id='about'>
        <div className='about__container'>

            <div className='about__leftSection'>

                <h3>About Us</h3>

                <h1>Reliable & Cost<br /> Efficient Consultant</h1>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique hic, non in delectus tempore eos a veritatis alias voluptatum reiciendis laudantium ab autem omnis pariatur fugit repellat blanditiis saepe quos?</p>

                <div className='about__imageContainer'>
                    <img src={leftSectionImage} alt='tax calculation'></img>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum minus recusandae sit maiores blanditiis voluptates cum non mollitia sapiente nostrum hic explicabo saepe quisquam culpa, vel ea! Aut, vitae consequatur.   </p>

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