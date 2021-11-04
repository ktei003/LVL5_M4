import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';


function App() {
	const [autocomplete, setAutocomplete] = useState([]);
	const debounced = useDebouncedCallback(value => getAutocomplete(value), 750)
	const [searchTerm, setSearchTerm] = useState()
	const [searchResults, setSearchResults] = useState([]);


	const getAutocomplete = (text) => {
		if (text) {
			axios.get('http://localhost:4000/autocomplete', { params: { prefix: text } })
				.then(res => setAutocomplete(res.data.completions))
				.catch(() => console.log("There was a catch error"))
		} else {
			setAutocomplete([]);
		}
	}

	const getSearch = (search) => {
		if (search) {
			axios.get('http://localhost:4000/search', { params: { search: search } })
				.then(res => {
					setSearchResults(res.data.results)
					console.log(res.data.results)
				})
				.catch(() => console.log("There was a catch error"))
		} else {
			console.log("text returned false")
			setSearchResults({})
		}
	}

	return (
		<div className="App">
			<h1>Turners FAQ Search</h1>
			<input type="text" onChange={(e) => {
				setSearchTerm(e.target.value)
				debounced(e.target.value)
			}}
			/>
			<div>
				{
					autocomplete.map((item) => (
						<div>{item}</div>
					))
				}
			</div>
			<button onClick={() => getSearch(searchTerm)}>Go</button>
			<div>
				<h2>Search results</h2>
				<div className={'searchResultContainer'}>
					{
						searchResults.map((item) => (
							<div className={'searchResultItem'}>
								<h3>{item.title}</h3>
								<div className={'searchResultItem__text'}>{item.text[0]}</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default App;