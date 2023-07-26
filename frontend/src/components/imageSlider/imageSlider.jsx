import React from 'react'
import './sliderStyle.css'

function ImageSlider({imageSlide}) {
    if (imageSlide.length > 0){
        return (
            <div id="carouselExampleControls" className="carousel slide image-slider" data-ride="carousel" >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={imageSlide[0].imageUrl} alt="First slide" />
                        <span className='slider-title'>{imageSlide[0].title}</span>
                        <div className='slider-date-author'>
                            <span className='slider-date'>{imageSlide[0].date.split(',')[0]}</span>
                            <span className='slider-author'># {imageSlide[0].author}</span>
        
                        </div>
                    </div>
        
                    {imageSlide.slice(1).map((item,index) => 
                    
                        <div className="carousel-item" key={index}>
                            <img className="d-block w-100" src={item.imageUrl} alt="Second slide" />
                            <span className='slider-title'>{item.title}</span>
                            <div className='slider-date-author'>
                                <span className='slider-date'>{item.date.split(',')[0]}</span>
                                <span className='slider-author'># {item.author}</span>
        
                            </div>
                        </div>
                    
                    
                    
                    )}
        
                </div>
                <a className="carousel-control-prev slider-control" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span id='slider-control-button' className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next slider-control" href="#carouselExampleControls" role="button" data-slide="next">
                    <span id='slider-control-button' className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
          )
    } 
    else{ return (<></>)}
  
}

export default ImageSlider
