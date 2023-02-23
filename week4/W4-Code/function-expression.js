// console.log(addFunc(1, 2))

// 1. ลองสร้าง function ด้วย function expression แล้วรันให้ดู
// 2. ลองรันก่อนถึง declaration เพื่ออธิบาย limitation ว่าต่างจาก function ปกติ
// 3. ลองเขียน function ปกติให้ดู แล้วเรียกก่อนถึง declaration
// 4. พูดถึงว่าปกติ function ปกติก็จะดีกว่า 
// ยกเว้นใช้แบบกำหนด function definition แบบ conditional

const addFunc = function (a, b) {
    return a + b
}

const newFunc = addFunc

console.log('Calling addFunc:', addFunc(1, 2))
console.log('Calling newFunc', newFunc(5, 2))

console.log('Calling multiply:', multiply(4, 2))

function multiply(a, b) {
    return a * b
}

let operation
let type = 'multiply'

if (type === 'add'){
    operation = function (a, b) {
        return a + b
    }
} else if (type === 'multiply') {
    operation = function (a, b) {
        return a * b
    }
}

console.log('Calling operation:', operation(4,6))


// !!! When to choose Function Declaration versus Function Expression?
// As a rule of thumb, when we need to declare a function, 
// the first to consider is "Function Declaration" syntax. 
// It gives more freedom in how to organize our code, because we can call such functions before they are declared.

// That’s also better for readability, as it’s easier to look up function f(…) {…} in the code than let f = function(…) {…};. Function Declarations are more “eye-catching”.

// …But if a Function Declaration does not suit us for some reason, 
// or we need a conditional declaration (we’ve just seen an example), then Function Expression should be used.