// import img from './logo.png'
// import "@babel/polyfill";
// console.log(img)
// import number from './test'
// lesson:4-9
import './style.css';

console.log('5')

$('body').css('backgroundColor', "#0094ff");
// const a = () => {
//     new Promise((res, rej) => res(0)).then(res => ["2", "3"].map(() => "hehe"))
// }

// if (module.hot) {
//     module.hot.accept('./test', () => {
//         console.log("hot")
//     })
// }

// function getComponent() {
//                     //lesson:4-5 魔法注释,告诉code spliting分割出来的文件名,否则会生成0.js这样的名字
// 	return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Dell', 'Lee'], '-');
// 		return element;
// 	})
// }

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });
// document.addEventListener('click', () =>{
//             // lesson:4-8 魔法注释,使用Prefetch
// 	import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
// 		func();
// 	})
// });
