import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import axios from 'axios';
import Home from './home.js';
import List from './list.js';

console.log('hello, this is dell');

// lesson:5-2
// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker.register('/service-worker.js')
// 			.then(registration => {
// 				console.log('service-worker registed');
// 			}).catch(error => {
// 				console.log('service-worker register error');
// 			})
// 	})
// }

// lesson:5-4
class App extends Component {
	componentDidMount() {
		axios.get('/react/api/header.json')
			.then((res) => {
				console.log(res.data);
			})
	}

	render() {
		// return <div>Hello World</div>
		// lesson:5-5
		return (
			<BrowserRouter>
				<div>
					<Route path="/" exact component={Home} />
					<Route path='/list' component={List} />
				</div>
			</BrowserRouter>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));
