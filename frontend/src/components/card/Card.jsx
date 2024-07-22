import React from 'react'


function Card(props) {

  const image = props.image;
  const title = props.title;
  const description = props.description;

  return (
    <div className='card'>
        <div className='card__container'>

            <img src={image} className='card__image' />

            <div className='card_textContainer'>
                <h2 className='card__title'>{title}</h2>
                <p className='card__para'>{description}</p>
            </div>

        </div>
       
    </div>
  )


}

export default Card