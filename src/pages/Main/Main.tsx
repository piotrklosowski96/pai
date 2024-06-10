import { useState } from "react";

const slides = [
	"puss_in_boots.jpg",
	"night.jpg",
	"avatar.jpg",
]

export default function Main() {
	const [curr, setCurr] = useState(0)

	const previousSlide = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
	const nextSlide = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

	return (
		<>
			<div className="grid bg-gray-100">
				{
					slides.map((slideSrc, i) => (
						<div hidden={i !== curr}>
							<img className="absolute w-full h-full object-cover object-center" src={slideSrc} alt=""/>
							<div className="absolute inset-0 flex items-center justify-between p-12">
								<button onClick={previousSlide} className='p-3 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'></button>
								<button onClick={nextSlide} className='p-3 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'></button>
							</div>
						</div>
					))
				}


			</div>

			{/*<div className="grow-0 w-full h-full">*/}
			{/*	<img className="w-full object-cover" src={"list_do_m5.jpg"} alt={""}/>*/}
			{/*	/!*<img className="w-full" src={"puss_in_boots.jpg"} alt={""}/>*!/*/}
			{/*</div>*/}

			{/*<div className="w-full">*/}
			{/*	<img className="w-full" src={"list_do_m5.jpg"} alt=""/>*/}


			{/*	/!*<Carousel autoSlide={true}>*/}
			{/*		{slides.map((s) => (*/}
			{/*			<img className="w-full" src={s} alt=""/>*/}
			{/*		))}*/}
			{/*	</Carousel>*!/*/}
			{/*</div>*/}
		</>
	)
}