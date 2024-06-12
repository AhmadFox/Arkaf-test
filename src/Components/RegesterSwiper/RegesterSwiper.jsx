import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { translate } from "@/utils";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

import SlideOne from "@/assets/auth-slider/slide-1.png";
import SlideTwo from "@/assets/auth-slider/slide-2.png";
import AvatarOne from "@/assets/auth-slider/avatar-1.png";
import AvatarTow from "@/assets/auth-slider/avatar-2.png";


const RegesterSwiper = ({ slideFor }) => {
	return (
		<div className='h-full relative p-3 hidden lg:block'>
			<div className="relative rounded-md overflow-hidden h-full w-full after:content-[''] after:absolute after:w-full after:h-2/3 after:bottom-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[#1A1B25]">
				<Image
					src={slideFor === "login" ? SlideOne : SlideTwo}
					alt={'Regester Slider One'}
					fill
				/>
				<div className="absolute bottom-0 left-0 overflow-hidden w-full p-12">
					<Swiper 
						pagination={true}
						loop={true}
						modules={[Pagination, Autoplay]}
						className="auth-swiper"
						autoplay={{
							delay: 6000, // Delay between transitions in ms
							disableOnInteraction: true // Continue autoplay after user interaction
						}}
					>
						<SwiperSlide>
							<p className='text-white mb-3'>“{translate('testimonialsMessage')}”</p>
							<div className="flex gap-2">
								<Image
									src={AvatarOne}
									alt={'Testomonial User Avatar One'}
									width={56}
									height={56}
									quality={100}
								/>
								<div className="">
									<h3 className='text-white font-medium text-lg'>Jenna Ortega</h3>
									<p className='text-white'>24 August 2024</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
						<p className='text-white mb-3'>“{translate('testimonialsMessage')}”</p>
							<div className="flex gap-2">
								<Image
									src={AvatarTow}
									alt={'Testomonial User Avatar Tow'}
									width={56}
									height={56}
									quality={100}
								/>
								<div className="">
									<h3 className='text-white font-medium text-lg'>Micheil Dawn</h3>
									<p className='text-white'>13 Jun 2023</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<p className='text-white mb-3'>“{translate('testimonialsMessage')}”</p>
							<div className="flex gap-2">
								<Image
									src={AvatarOne}
									alt={'Testomonial User Avatar One'}
									width={56}
									height={56}
									quality={100}
								/>
								<div className="">
									<h3 className='text-white font-medium text-lg'>john Salmon</h3>
									<p className='text-white'>24 Jun 2024</p>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default RegesterSwiper
