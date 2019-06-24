import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

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
		return <div>Hello World</div>
	}
}

ReactDom.render(<App />, document.getElementById('root'));
