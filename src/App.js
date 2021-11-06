import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { ReactComponent as SearchSVG } from './assets/search.svg';


function App() {
	const endpoint = "http://localhost:4000/";
	const [autocomplete, setAutocomplete] = useState([]);
	const debounced = useDebouncedCallback(value => getAutocomplete(value), 750);
	const [searchTerm, setSearchTerm] = useState();
	const [searchResults, setSearchResults] = useState([]);
	const [collectionList, setCollectionList] = useState([]);
	const [currentCollection, setCurrentCollection] = useState({});

	const getCollections = () => {
		axios.get(endpoint + 'collections')
			.then(res => setCollectionList(res.data))
			.catch(() => console.log("There was a catch eror"));
	}

	useEffect(() => getCollections(), [])
	useEffect(() => setCurrentCollection(collectionList[0]),[collectionList])

	const getAutocomplete = (text) => {
		if (text) {
			axios.get('http://localhost:4000/autocomplete', { params: { prefix: text } })
				.then(res => setAutocomplete(res.data.completions))
				.catch(() => console.log("There was a catch error"));
		} else {
			setAutocomplete([]);
		}
	}

	const handleEnter = (e) => {
		if (e.charCode === 13) handleSearch();
		setAutocomplete([])
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

	const openInNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null
	}

	return (
		<div className="App">
			<div className="upper">
				<div className='title'>Search Turners</div>
				<div className='searchContainer'>
					<div className='searchContainer__searchWrapper'>
						<SearchSVG className='searchIcon' />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value)
								debounced(e.target.value)
							}}
							onKeyPress={handleEnter}
						/>
					</div>
					<div className={`searchContainer__autocomplete ${(autocomplete[0]) || "hidden"}`}>
						{
							autocomplete.map((item) => (
								<div className='searchContainer__autocomplete__item'
									onClick={() => {
										setSearchTerm(item)
										setAutocomplete([])
									}}>
									{item}
								</div>
							))
						}
					</div>
				</div>

			</div>
			<div className='lower'>
				{/* <h2>Search results</h2> */}
				<div className='searchResultContainer'>
					<div className="gradient">

					</div>
					{
						searchResults.map((item) => (
							<div className='searchResultItem' onClick={() => openInNewTab(item.metadata.source.url)}>
								<h3>{item.title[0].length > 150 ? item.title[0].slice(0, 147) + "..." : item.title}</h3>
								<div className='searchResultItem__text'><p>{item.text[0]}</p><br /><p className="searchResultItem__link">Source: {item.metadata.source.url}</p></div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default App;