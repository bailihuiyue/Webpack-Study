// import img from './logo.png'

// console.log(img)

import number from './test'

console.log('5')

if(module.hot){
    module.hot.accept('./test',()=>{
        console.log("hot")
    })
}