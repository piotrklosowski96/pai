import { useEffect, useState } from "react";

export interface ICarouselProps {}

export function Carousel({children: slides, autoSlide = false, autoSlideInterval = 100000}) {
	const [curr, setCurr] = useState(0)

	const previousSlide = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
	const nextSlide = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

	useEffect(() => {
		if (!autoSlide) return
		const slideInterval = setInterval(nextSlide, autoSlideInterval)
		return () => clearInterval(slideInterval)
	}, [])

	return (
		<>
			<div className='flex grow object-cover overflow-hidden'>
				<div className='flex grow transition-transform ease-out duration-500' style={{transform: `translateX(-${curr * 100}%)`}}>
					{slides}
				</div>
				<div className="absolute inset-0 flex items-center justify-between p-12">
					<button onClick={previousSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'/>
					<button onClick={nextSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'/>
				</div>
			</div>
		</>
	)
}

