import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { ReactComponent as SearchSVG } from './assets/search.svg'


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
		console.log(autocomplete)
	}

	const handleEnter = (e) => {
		console.log(e)
		if (e.charCode === 13) handleSearch();
	}

	const handleSearch = () => {
		getSearch(searchTerm)
	}

	const getSearch = (search) => {
		if (search) {
			axios.get('http://localhost:4000/search', { params: { search: search } })
				.then(res => {
					setSearchResults(res.data.results)
					console.log(res.data.results)
					setAutocomplete([])
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
				
			<div className="searchContainer">
				<div className="searchContainer__searchWrapper">
					<SearchSVG height="50px" width="50px" className="searchIcon"/>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
						debounced(e.target.value)
					}}
					onKeyPress={handleEnter}
				/>
				<div>G</div>
				</div>
				<div className={`searchContainer__autocomplete ${searchTerm || "hidden"}`}>
					{
						autocomplete.map((item) => (
							<div className='searchContainer__autocomplete__item' onClick={() => {
								setSearchTerm(item)
								setAutocomplete([])
								console.log(item)
							}}>{item}</div>
						))
					}
				</div>

			</div>
			<button onClick={handleSearch}>Go</button>
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