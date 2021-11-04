import './App.css';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';


function App() {
	const [autocomplete, setAutocomplete] = useState([]);
	const debounced = useDebouncedCallback(value => getAutocomplete(value), 750)

	const getAutocomplete = (text) => {
		if (text) {
			axios.get('http://localhost:4000/autocomplete', { params: { prefix: text } })
				.then(res => setAutocomplete(res.data.completions))
				.catch(() => console.log("There was a catch error"))
		} else {
			setAutocomplete([]);
		}
	}

	return (
		<div className="App">
			<h1>Turners FAQ Search</h1>
			<input type="text" onChange={(e) => debounced(e.target.value)} />
			<div>
				{
					autocomplete.map((item) => (
						<div>{item}</div>
					))
				}
			</div>
		</div>
	);
}

export default App;