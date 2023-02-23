// First example
console.log("Hi! let's start");

setTimeout(function timeout() {
    console.log("3 seconds passed.");
}, 3000);

console.log("This is the end.");

// Second example
console.log("Hi! let's start");

setTimeout(function timeout() {
    console.log("3 seconds passed.");
    
}, 3000);

setTimeout(function timeout() {
    console.log("4 seconds passed.");
    
}, 1000);

console.log("This is the end.");

// Third example
console.log("Hi! let's start");

setTimeout(function timeout() {
    console.log("3 seconds passed.");
    setTimeout(function timeout() {
        console.log("4 seconds passed.");
        console.log("This is the end.");
    }, 1000);
}, 3000);

// Text color example
// let size = 1;
// document.getElementById('title').style.fontSize = size + 'em';
// document.getElementById('title').style.color = 'red';
// size++
// document.getElementById('title').style.fontSize = size + 'em';
// document.getElementById('title').style.color = 'green';
// size++
// document.getElementById('title').style.fontSize = size + 'em';
// document.getElementById('title').style.color = 'blue';
// size++
// document.getElementById('title').style.fontSize = size + 'em';
// document.getElementById('title').style.color = 'orange';

// setTimeout(function () {
//     document.getElementById('title').style.fontSize = size + 'em';
//     document.getElementById('title').style.color = 'red';
//     size++
//     setTimeout(function () {
//         document.getElementById('title').style.fontSize = size + 'em';
//         document.getElementById('title').style.color = 'green';
//         size++
//         setTimeout(function () {
//             document.getElementById('title').style.fontSize = size + 'em';
//             document.getElementById('title').style.color = 'blue';
//             size++
//             setTimeout(function () {
//                 document.getElementById('title').style.fontSize = size + 'em';
//                 document.getElementById('title').style.color = 'orange';
//                 size++
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// Callback nesting!!!
// let size = 1;
// const enlargeTitle = (color, time) => {
//     setTimeout(() => {
//         document.getElementById('title').style.fontSize = size + 'em';
//         document.getElementById('title').style.color = color;
//     }, time)
// }

// enlargeTitle('red', 1000)
// enlargeTitle('green', 2000)

let size = 1;
const enlargeTitle = (color, time, doNext) => {
    setTimeout(() => {
        document.getElementById('title').style.fontSize = size + 'em';
        document.getElementById('title').style.color = color;
        size++
        doNext()
    }, time)
}

enlargeTitle('red', 1000, () => {
    enlargeTitle('green', 1000, () => {
        enlargeTitle('blue', 1000, () => {
            enlargeTitle('orange', 1000, () => {
                console.log('END!!!')
            })
        })
    })
})

