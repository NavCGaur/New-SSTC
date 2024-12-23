import React from 'react'

import './Service.css'

import image1 from '../../assets/serviceimage1.png'
import image2 from '../../assets/serviceimage2.png'
import image3 from '../../assets/serviceimage3.png'
import image4 from '../../assets/serviceimage1.png'
import image5 from '../../assets/serviceimage1.png'
import image6 from '../../assets/serviceimage3.png'

import {ReactComponent as RightArrow} from '../../assets/rightarrow.svg'

import Card from '../../components/card/Card'


function Service() {
    const cardData = [
        {
            image: image1,
            title: 'GST Registration',
            description: 'Register your business for GST seamlessly with expert assistance. Ensure compliance, claim input tax credits, expand your business legally.',
            service: 'Start GST Registration'
        },
        {
            image: image2,
            title: 'MSME Registration',
            description: 'Simplify your MSME registration with our expert support. Gain government benefits, tax subsidies, and exclusive schemes for your business growth.',
            service: 'Start MSME Registration'

        },
        {
            image: image3,
            title: 'Business Entity Registration',
            description: 'Company, LLP, or Partnership Firm registration with expert guidance. Compliance, credibility, opportunities for growth with legal framework.',
            service: 'Start Business Registration'

        },
        {
            image: image4,
            title: 'GST Return Filing',
            description: 'Ensure timely and accurate GST return filing with our expert services, helping you stay compliant and avoid penalties.',
            service: 'Start GST Filing'

        },

        {
            image: image5,
            title: 'Income Tax Return Filing (ITR)',
            description: 'File your Income Tax Returns (ITR) accurately and on time with our expert assistance, ensuring compliance and maximizing refunds.',
            service: 'Start ITR Filing'

        },  
        {
            image: image6,
            title: 'Accounting & BookKeeping',
            description: 'Manage your finances efficiently with our professional accounting and bookkeeping services, ensuring accurate records and timely reports.',
            service: 'Start Accounting & Bookkeeping'

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
                        <p>{card.service}</p>
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