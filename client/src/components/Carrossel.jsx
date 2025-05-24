import React from 'react'
import { Carousel } from 'react-bootstrap'

const Carrossel = () => {
  return (
   
     <Carousel>
      <Carousel.Item>
        <img src='https://spacenet.tn/img/cms/zflip2.jpg'  text="First slide"   style={{ height: '550px', width: '100%', objectFit: 'cover' }}

        />
        <Carousel.Caption>
          <h3>Z Flip Series</h3>
          <p>Decouvrez notre nouvelles gamme de Z series</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://www.iphon.fr/app/uploads/2024/09/iPhone-16-Pro-Max-1.jpg' text="Second slide"
          style={{ height: '550px', width: '100%', objectFit: 'cover' }}
         />
        <Carousel.Caption>
          <h3>Le nouveau iphone 16 pro max</h3>
          <p>Vous addorez le BLING BLING ?</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://www.01net.com/app/uploads/2021/04/Samsung-Galaxy-Note-20-Ultra-dos-avec-stylert.jpg' text="Third slide" 
          style={{ height: '550px', width: '100%', objectFit: 'cover' }}
            />
        <Carousel.Caption>
          <h3>Note 20</h3>
          <p>
            Ecrivez votre vie a votre style.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Carrossel