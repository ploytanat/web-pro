// // Syntax ปกติ
// let sum = (a, b) => a + b

// console.log(sum(2, 3))

// // Syntax แบบมี 1 argument ไม่ต้องมีวงเล็บ
// let power2 = n => n * n

// console.log(power2(5))

// // Syntax แบบไม่มี argument
// let greet = () => alert('Hello to arrow function!')

// greet()

// let age = prompt("What is your age?", 18);
// let sayHello
// if (age <= 18) {
//     sayHello = () => console.log('Hello boy/girl!')
// }else{
//     sayHello = () => console.log('Hi there, you are an adult.')
// }

// Exercise map() filter()

let arr = [3,4,2,10,9,12,6]

debugger
console.log('Original:', arr)

let result = arr.map((val) => val * 2)
console.log('Double:', result)

result = arr.map((val, index) => {
    if (index % 2 ==0) {
        return val * 2
    } else {
        return val
    }
})
console.log('Double only even index:', result)

console.log('Only > 5:', arr.filter((val) => val > 5))

// Exercise setTimeout() setInterval()
setTimeout(() => console.log("After 3 seconds already!"), 3000);

setTimeout(() => {
    document.body.style.backgroundColor = 'grey';
    document.getElementById('title').innerText = '5 Seconds'
}, 5000);

let n = 0
let int1 = setInterval(() => console.log(n++, 'second'), 1000);
setTimeout(() => clearInterval(int1), 8001);

