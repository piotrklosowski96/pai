export function ContactPage() {
	const localizations = [
		{
			map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10204.751347186522!2d19.025626!3d50.251076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce4c68133a5d%3A0x45e997ada8be953b!2sReymonta%2034%2C%2040-038%20Katowice!5e0!3m2!1sen!2spl!4v1716057742944!5m2!1sen!2spl",
			street: "ul. Reymonta 34",
			postalCode: "40-038",
			city: "Katowice",
			mail: "katowice@wawel.pl"
		},
		{
			map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10246.003654698903!2d19.943834!3d50.05818!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b1478c5fd51%3A0xd5433298b8a5488c!2sStarowi%C5%9Blna%2010%2C%2031-032%20Krak%C3%B3w!5e0!3m2!1sen!2spl!4v1716057917028!5m2!1sen!2spl",
			street: "ul. Starowiślna 10",
			postalCode: "31-038",
			city: "Kraków",
			mail: "krakow@wawel.pl"
		},
		{
			map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10018.028989345898!2d15.289780000000002!3d51.117551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4708d3949ee4c093%3A0xd46ba8b0a377a44f!2s7%20Dywizji%2015%2C%2059-800%20Luba%C5%84!5e0!3m2!1sen!2spl!4v1716057959215!5m2!1sen!2spl",
			street: "ul. 7 Dywizji 15",
			postalCode: "59-800",
			city: "Lubań",
			mail: "luban@wawel.pl"
		},
		{
			map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10115.271060623532!2d17.931752000000003!3d50.66764400000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47105308b608e2d9%3A0xb646fc9ade2f91a3!2sOzimska%2040%2C%2045-058%20Opole!5e0!3m2!1sen!2spl!4v1716057998490!5m2!1sen!2spl",
			street: "ul. Ozimska 40",
			postalCode: "45-058",
			city: "Opole",
			mail: "opole@wawel.pl"
		},
		{
			map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10018.865484691134!2d17.037646!3d51.113693!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9d8d561b2cb%3A0x85e298f44e3ba71b!2sGrodzka%2011%2C%2050-137%20Wroc%C5%82aw!5e0!3m2!1sen!2spl!4v1716058028677!5m2!1sen!2spl",
			street: "ul. Grodzka 11",
			postalCode: "50-115",
			city: "Wrocław",
			mail: "wroclaw@wawel.pl"
		},
	]

	return (
		<div className={"flex flex-col w-full items-center justify-center"}>
			{localizations.map((l) => (
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div>
						<iframe
							src={l.map}
							width="400" height="250" loading="lazy"
							referrerPolicy="no-referrer-when-downgrade">
						</iframe>
						<h1 className={"text-lg"}>{l.city}</h1>
						<h1>{l.street}, {l.postalCode} {l.city}</h1>
						<h1>{l.mail}</h1>
					</div>
				</div>
			))}
		</div>
	)
}