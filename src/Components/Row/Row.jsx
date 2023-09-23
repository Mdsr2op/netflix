import React from 'react'
import Card from '../Card/Card'
import Image from '../../Images/endgame.jpg'

const Row = ({title,arr=[
  {img:Image}
  ]}) => {

    const imgUrl = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div className='row'>
        <h2>{title}</h2>


        <div>
           {
            arr.map((item,index) =>(
              <Card img={`${imgUrl}/${item.poster_path}`} key={index}/>
            ))
           }
        </div>
        
    </div>
    


  )
}

export default Row