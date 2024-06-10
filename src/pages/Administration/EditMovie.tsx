import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export const editMovieLoader = async () => {
	return {
		name: "Avatar: Istota Wody",
		description: "Akcja filmu Avatar: Istota wody rozgrywa się ponad dziesięć lat po wydarzeniach z pierwszej części. To opowieść o rodzinie Jake’a i Neytiri oraz ich staraniach, by zapewnić bezpieczeństwo sobie i swoim dzieciom, mimo tragedii, których wspólnie doświadczają i bitew, które muszą stoczyć, aby przeżyć.* Drodzy widzowie w filmie Avatar: Istota wody znajduje się kilka scen z dynamicznymi efektami świetlnymi, które mogą powodować dyskomfort u widzów wrażliwych na światło i wpływać na osoby z epilepsją fotogenną.",
		genre: "Sci-Fi",
		ageRestriction: "13+",
		length: 193,
		status: "archived",
		imageURL: "https://a.allegroimg.com/original/11d976/334547e342fbb91918a02f507c6e/Plakat-Avatar-Istota-wody-AVATAR-2-2022-100x70"
	}
}

export function EditMovie() {
	const genres = [
		{
			name: "Akcja"
		},
		{
			name: "Horror"
		},
		{
			name: "Komedia"
		},
		{
			name: "Thriller"
		},
		{
			name: "Romans"
		},
		{
			name: "Sensacja"
		},
		{
			name: "Sci-Fi"
		},
	]
	const editedMovie = useLoaderData()

	const [ selectedGenre, setSelectedGenre ] = useState(editedMovie.genre)
	const [ selectedAgeRestriction, setSelectedAgeRestriction ] = useState(editedMovie.ageRestriction)

	return (
		<>
			<form>
				<label>
					Tytuł:
					<input type={"text"} value={editedMovie.name}/>
				</label>
				<br/>
				<label>
					Gatunek:
					<select defaultValue={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
						{
							genres.map((g) => (
								<option value={g.name}>{g.name}</option>
							))
						}
						<option>Nowy...</option>
					</select>
				</label>
				<br/>
				<label>
					Kategoria wiekowa
					<label>
						<input type="radio" name={"ageRestriction"} value={"7+"} checked={selectedAgeRestriction === "7+"} onChange={(e) => setSelectedAgeRestriction(e.target.value)}/>
						7+
					</label>
					<label>
						<input type="radio" name={"ageRestriction"} value={"13+"} checked={selectedAgeRestriction === "13+"} onChange={(e) => setSelectedAgeRestriction(e.target.value)}/>
						13+
					</label>
					<label>
						<input type="radio" name={"ageRestriction"} value={"16+"} checked={selectedAgeRestriction === "16+"} onChange={(e) => setSelectedAgeRestriction(e.target.value)}/>
						16+
					</label>
					<label>
						<input type="radio" name={"ageRestriction"} value={"18+"} checked={selectedAgeRestriction === "18+"} onChange={(e) => setSelectedAgeRestriction(e.target.value)}/>
						18+
					</label>
				</label>
				<br/>
				<label>
					Czas trwania:
					<input type="number" min={0} defaultValue={0} value={editedMovie.length}/> min.
				</label>
				<br/>
				<label>
					Opis:
					<textarea rows={10} cols={80} value={editedMovie.description}/>
				</label>
				<br/>
				<label>
					Plakat
					<input type="file"/>
				</label>
				<br/>
				<label>
					Obraz tła
					<input type="file"/>
				</label>
				<br/>
				<label>
					Link do zwiastunu
					<input type="url" value={editedMovie.imageURL}/>
				</label>
				<br/>
				<button type="submit">
					Zapisz
				</button>
			</form>
		</>
	)
}