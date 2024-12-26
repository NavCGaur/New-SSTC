//React imports
import React from 'react'
  
//Importing SVG as React components
import {ReactComponent as Phone} from '../../assets/phone-solid.svg'
import {ReactComponent as Email} from '../../assets/email.svg'

function Contact() {
  return (
    <div className='contact'>
        <div className='contact__email'>
            <Email className='contact__email-icon'/>
            <p contact__email-text>mithilesh@md.co.in</p>
        </div>

        <div className='contact__phone'>
            <Phone className='contact__phone-icon'/>
            <p> +91 98222222211</p>
        </div>
    </div>
  )
}

export default Contact