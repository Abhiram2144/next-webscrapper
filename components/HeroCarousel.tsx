"use client"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
    {imgUrl: "/assets/images/hero-1.svg", alt:"smart-watch"},
    {imgUrl: "/assets/images/hero-2.svg", alt:"smart-watch"},
    {imgUrl: "/assets/images/hero-3.svg", alt:"smart-watch"},
    {imgUrl: "/assets/images/hero-4.svg", alt:"smart-watch"},
]

const HeroCarousel = () => {
    return (
        <div className='hero-carousel'>
            <Carousel showThumbs={false} autoPlay infiniteLoop interval={2000} showArrows={false} showStatus={false}>
                {heroImages.map((image, ind)=>(
                    <Image
                        src={image.imgUrl}
                        alt={image.alt}
                        width={484}
                        height={484}
                        key = {ind}
                    />
                ))}
            </Carousel>
            <Image alt='arrow' src="assets/icons/hand-drawn-arrow.svg" width={175} height={175} className='max-xl:hidden absolute -left-[15%] bottom-10 z-0'></Image>
        </div>
    )
}

export default HeroCarousel
