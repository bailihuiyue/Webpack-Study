// import img from './logo.png'
// import "@babel/polyfill";
// console.log(img)
import number from './test'

console.log('5')

const a = () => {
    new Promise((res, rej) => res(0)).then(res => ["2", "3"].map(() => "hehe"))
}

if (module.hot) {
    module.hot.accept('./test', () => {
        console.log("hot")
    })
}