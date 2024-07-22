import React from 'react'

import './Service.css'

import image1 from '../../assets/serviceimage1.png'
import image2 from '../../assets/serviceimage2.png'
import image3 from '../../assets/serviceimage3.png'
import image4 from '../../assets/serviceimage1.png'
import image5 from '../../assets/serviceimage2.png'
import image6 from '../../assets/serviceimage3.png'

import {ReactComponent as RightArrow} from '../../assets/rightarrow.svg'

import Card from '../../components/card/Card'


function Service() {
    const cardData = [
        {
            image: image1,
            title: 'GST Registration',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },
        {
            image: image2,
            title: 'MSME Registration',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },
        {
            image: image3,
            title: 'Accounting & BookKeeping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },
        {
            image: image4,
            title: 'GST Registration',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },

        {
            image: image5,
            title: 'MSME Registration',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },
        {
            image: image6,
            title: 'Accounting & BookKeeping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, libero necmollis eleifend, nunc.',
        },


]

  return (
    <div className='service' id='service'>
        <div className='service__container'>

            <div className='service__titles'>
                <h1 className='gradient-text'>Services</h1>
                <h2>Our Solutions</h2>
                <h5>services</h5>
            </div>


            <div className='service__cards'>
                {cardData.map((card,index)=>
                <div className='service__card'>
                    <Card image={card.image} title={card.title} description={card.description}/>
                    <a href='#' className='service__card-link'>
                        <p>Read More</p>
                        <RightArrow className='service__rightarrow'/>
                        
                    </a>
                </div>)}
            </div>

            <a href='#' className='service__button'>and more</a>

        </div>

        <div className='service__ctaContainer'>
            <p>Let's discuss about how we can help make your business better</p>
            <a href='#footer'>Lets Talk</a>

        </div>
    </div>
  )
}

export default Service